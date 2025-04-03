import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {StatusCodes} from "http-status-codes";
import {BaseController, HttpError, HttpMethod} from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import {capitalizeFirstLetter, checkCity, checkString, fillDTO} from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import {IOfferService, CreateOfferRequestType, UpdateOfferRequestType} from "./types/index.js";

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Put, handler: this.updateById });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteById });
    this.addRoute({ path: '/:offerId', method:HttpMethod.Get, handler: this.findById });
    this.addRoute({ path: '/premium/:city', method:HttpMethod.Get, handler: this.findPremium });
    this.addRoute({ path: '/favorites', method:HttpMethod.Get, handler: this.findFavorites });
    this.addRoute({ path: '/:offerId/favorite', method:HttpMethod.Get, handler: this.updateFavorite });
  }

  async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    // const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, offers);
  }

  async create(
    { body }: CreateOfferRequestType,
    res: Response
  ): Promise<void> {
    const existOffer = await this.offerService.create(body);

    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offers with id «${body.userId}» exists.`,
        'OfferController'
      );
    }

    const offer = await this.offerService.create(body);
    this.created(res, offer);
  }

  async updateById({ body, params }: UpdateOfferRequestType, res: Response): Promise<void> {
    const offerId = checkString(params.offerId);

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `The specified id ${params.offerId} is not valid`,
        'OfferController'
      );
    }

    const offer = this.offerService.updateById(offerId, body);
    const responseData = fillDTO(OfferRdo, offer);

    this.ok(res, responseData);
  }

  async deleteById({params}: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.deleteById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified id «${params.offerId}» is not found.`,
        'OfferController',
      );
    }

    this.noContent(res, existsOffer);
  }

  async findById({ params }: Request, res: Response):Promise<void>{
    const existsOffer = await this.offerService.findById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified id «${params.offerId}» is not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, existsOffer));
  }

  async findPremium({ params }: Request, res: Response):Promise<void>{
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

  async findFavorites(_req: Request, _res: Response):Promise<void>{
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
}
