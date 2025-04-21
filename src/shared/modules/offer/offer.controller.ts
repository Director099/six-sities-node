import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import {
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import {capitalizeFirstLetter, checkCity, fillDTO, getNumberOrUndefined} from '../../helpers/index.js';
import {CommentRdo, ICommentService} from '../comment/index.js';
import {
  IOfferService,
  CreateOfferRequestType,
  UpdateOfferRequestType,
  ParamOfferIdType,
  FindOfferRequestType
} from './types/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
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

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Get,
      handler: this.updateFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  async index({ query: { limit } }: FindOfferRequestType, res: Response): Promise<void> {
    const offers = await this.offerService.find(limit);
    const responseData = fillDTO(OfferRdo, offers);

    this.ok(res, responseData);
  }

  async create({ body, tokenPayload }: CreateOfferRequestType, res: Response): Promise<void> {
    const offer = await this.offerService.create({ ...body, userId: tokenPayload.id });
    this.created(res, offer);
  }

  async update({ body, params }: UpdateOfferRequestType, res: Response): Promise<void> {
    const offer = this.offerService.updateById(params.offerId, body);
    const responseData = fillDTO(OfferRdo, offer);

    this.ok(res, responseData);
  }

  async delete({params}: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.deleteById(params.offerId);
    this.noContent(res, existsOffer);
  }

  async show({ params }: Request, res: Response):Promise<void>{
    const existsOffer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, existsOffer));
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

  async getFavorites(_req: Request, _res: Response):Promise<void>{
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  async updateFavorite(_req: Request, _res: Response):Promise<void>{
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  async getComments(
    { params: { offerId }, query: { limit } }: Request<ParamOfferIdType>, res: Response
  ): Promise<void> {
    const count = getNumberOrUndefined(limit);
    const comments = await this.commentService.findByOfferId(offerId, count);

    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
