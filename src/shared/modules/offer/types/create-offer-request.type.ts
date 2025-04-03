import { Request } from 'express';
import { RequestBodyType, RequestParamsType } from '../../../libs/rest/index.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';

export type CreateOfferRequestType = Request<RequestParamsType, RequestBodyType, CreateOfferDto>;
