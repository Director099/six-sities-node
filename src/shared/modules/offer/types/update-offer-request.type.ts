import { Request } from 'express';
import { RequestBodyType } from '../../../libs/rest/index.js';
import { UpdateOfferDto } from '../dto/index.js';
import {ParamOfferIdType} from './param-offerid.type.js';

export type UpdateOfferRequestType = Request<ParamOfferIdType, RequestBodyType, UpdateOfferDto>;
