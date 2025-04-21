import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  BaseController, DocumentExistsMiddleware,
  HttpMethod, PrivateRouteMiddleware, ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/index.js';
import { IOfferService, FindOfferRequestType } from '../offer/index.js';
import { ICommentService } from './comment-service.interface.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.CommentService) private readonly commentService: ICommentService,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentsController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ],
    });
    this.addRoute({
      path: '/offerId',
      method: HttpMethod.Get,
      handler: this.findByOfferId,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'id'),
      ]
    });
  }

  async create({ body, tokenPayload } : Request, res: Response): Promise<void> {
    const offerId = body.offerId;
    const comment = await this.commentService.create({
      ...body,
      userId: tokenPayload.id,
    });

    await this.offerService.incCommentCount(offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  async findByOfferId(
    { params: { offerId} , query: { limit } }: FindOfferRequestType, res: Response
  ): Promise<void> {

    const comments = await this.commentService.findByOfferId(offerId, limit);

    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
