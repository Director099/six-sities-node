import { Request } from 'express';
import { RequestQueryType } from '../../../libs/rest/index.js';
import { ParamOfferIdType } from './param-offerid.type.js';

export type FindOfferRequestType = Request<ParamOfferIdType, unknown, unknown, RequestQueryType>;
