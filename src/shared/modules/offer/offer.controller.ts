import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import {
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware, RequestBodyType,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware, ValidateUserMiddleware
} from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import {capitalizeFirstLetter, checkCity, fillDTO, getNumberOrUndefined} from '../../helpers/index.js';
import {CommentRdo, ICommentService} from '../comment/index.js';
import {Path} from '../../constants/index.js';
import {
  IOfferService,
  CreateOfferRequestType,
  UpdateOfferRequestType,
  ParamOfferIdType,
  FindOfferRequestType
} from './types/index.js';
import { OfferRdo } from './rdo/index.js';
import {CreateOfferDto, UpdateOfferDto} from './dto/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.CommentService) private readonly commentService: ICommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: Path.Index,
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: Path.Create,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ],
    });
    this.addRoute({
      path: Path.Update,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateUserMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: Path.Delete,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateUserMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: Path.Show,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: Path.Premium,
      method: HttpMethod.Get,
      handler: this.getPremium
    });
    this.addRoute({
      path: Path.Favorites,
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: Path.toggleFavorites,
      method: HttpMethod.Get,
      handler: this.updateFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: Path.Comments,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  async index({ query: { limit } }: FindOfferRequestType, res: Response): Promise<void> {
    const count = getNumberOrUndefined(limit);
    const offers = await this.offerService.find(count);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async create({ body, tokenPayload }: CreateOfferRequestType, res: Response): Promise<void> {
    const offer = await this.offerService.create({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async update({ body, params: { offerId } }: UpdateOfferRequestType, res: Response): Promise<void> {
    const updateOffer = await this.offerService.updateById(offerId, body);

    this.ok(res, fillDTO(OfferRdo, updateOffer));
  }

  async delete({ params: { offerId } }: Request<ParamOfferIdType>, res: Response): Promise<void> {
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  async show({ params: { offerId } }: Request<ParamOfferIdType>, res: Response): Promise<void> {
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async getPremium({ params }: Request, res: Response):Promise<void>{
    const city = checkCity(params.city);

    if (!city) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `The specified city «${capitalizeFirstLetter(params.city)}» is not found.`,
        'OfferController',
      );
    }

    const premiumOffers = await this.offerService.findPremium(city);

    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

  async getFavorites({ tokenPayload: { id } }: Request, res: Response):Promise<void>{
    const offers = await this.offerService.findFavorites(id);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async updateFavorite(
    {
      params: { offerId },
      tokenPayload: { id },
      body,
    }: Request<ParamOfferIdType, RequestBodyType, { isFavorite: string }>,
    res: Response
  ):Promise<void>{
    const isFavorite: boolean = JSON.parse(body.isFavorite);
    const userId = id;

    const offer = await this.offerService.toggleFavorite(
      userId,
      offerId,
      isFavorite
    );

    this.ok(res, {
      favorites: offer,
    });
  }

  async getComments(
    { params: { offerId }, query: { limit } }: Request<ParamOfferIdType>, res: Response
  ): Promise<void> {
    const count = getNumberOrUndefined(limit);
    const comments = await this.commentService.findByOfferId(offerId, count);

    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
