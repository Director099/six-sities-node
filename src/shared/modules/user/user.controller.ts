import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod, PrivateRouteMiddleware, UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { IConfig, RestSchemaType } from '../../libs/config/index.js';
import {Env, Path} from '../../constants/index.js';
import { IAuthService } from '../auth/index.js';
import { CreateUserDto, LoginUserDto } from './dto/index.js';
import { LoggedUserRdo, UserRdo } from './rdo/index.js';
import { CreateUserRequestType, LoginUserRequestType, IUserService } from './types/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly configService: IConfig<RestSchemaType>,
    @inject(Component.AuthService) private readonly authService: IAuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: Path.Register,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: Path.Login,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: Path.Logout,
      method: HttpMethod.Post,
      handler: this.logout,
    });
    this.addRoute({
      path: Path.Login,
      method: HttpMethod.Get,
      handler: this.checkAuthToken,
      middlewares: [
        new PrivateRouteMiddleware(),
      ],
    });
    this.addRoute({
      path: Path.UserIdAvatar,
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get(Env.UploadDirectory), 'avatar'),
      ],
    });
  }

  async create(
    { body }: CreateUserRequestType,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get(Env.Salt)
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  async login(
    { body }: LoginUserRequestType,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });

    this.ok(res, responseData);
  }

  async logout(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  async checkAuthToken({ tokenPayload: { email } }: Request, res: Response): Promise<void> {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path,
    });
  }
}
