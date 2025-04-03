import { Request } from 'express';
import { RequestBodyType, RequestParamsType } from '../../../libs/rest/index.js';
import { LoginUserDto } from '../dto/login-user.dto.js';

export type LoginUserRequestType = Request<RequestParamsType, RequestBodyType, LoginUserDto>;
