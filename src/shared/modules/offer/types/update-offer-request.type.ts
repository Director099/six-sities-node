import { Request } from 'express';
import { RequestBodyType, RequestParamsType } from '../../../libs/rest/index.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';

export type UpdateOfferRequestType = Request<RequestParamsType, RequestBodyType, UpdateOfferDto>;
