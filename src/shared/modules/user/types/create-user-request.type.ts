import { Request } from 'express';
import { RequestBodyType, RequestParamsType } from '../../../libs/rest/index.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

export type CreateUserRequestType = Request<RequestParamsType, RequestBodyType, CreateUserDto>;
