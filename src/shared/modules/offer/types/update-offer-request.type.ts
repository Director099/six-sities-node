import { Request } from 'express';
import { RequestBodyType } from '../../../libs/rest/index.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';
import {ParamOfferIdType} from "./param-offerid.type.js";

export type UpdateOfferRequestType = Request<ParamOfferIdType, RequestBodyType, UpdateOfferDto>;
