import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import {Component} from '../../../types/index.js';
import { ILogger } from '../../logger/index.js';
import { PathTransformer } from '../transform/index.js';
import { IRoute } from '../types/index.js';
import { IController } from './controller.interface.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements IController {
  private readonly _router: Router;

  @inject(Component.PathTransformer)
  private pathTransformer: PathTransformer;

  constructor(
    protected readonly logger: ILogger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  addRoute(route: IRoute) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTransformer.execute(data as Record<string, unknown>);
    res.type(DEFAULT_CONTENT_TYPE).status(statusCode).json(modifiedData);
  }

  created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
