import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IOfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import {OfferCount, DEFAULT_COMMENT_COUNT} from "../../constants/index.js";
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  #usersLookup = [
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'users',
      },
    },
  ];

  #commentsLookup = [
    {
      $lookup: {
        from: 'comments',
        let: { offerId: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } }],
        as: 'comments',
      },
    },
    {
      $addFields: {
        rating: { $avg: '$comments.rating' },
        commentCount: { $size: '$comments' },
      },
    },
    { $unset: 'comments' },
  ];

  async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: ['$_id', { $toObjectId: offerId }],
            },
          },
        },
        ...this.#commentsLookup,
        ...this.#usersLookup,
      ])
      .exec()
      .then(([result]) => result ?? null);
  }

  async findPremium(city: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        {
          $match: {
            $and: [{ isPremium: true }, { city: city }],
          },
        },
        ...this.#commentsLookup,
        { $limit: OfferCount.Premium },
        { $sort: { publicationDate: SortType.Down } },
      ])
      .exec();
  }

  async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ favorites: true })
      .sort({ createdAt: SortType.Down })
      .populate('userId')
      .exec();
  }

  async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_COMMENT_COUNT;

    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate('userId')
      .exec();
  }

  async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { $inc: { commentCount: 1, }, })
      .exec();
  }

  async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }
}
