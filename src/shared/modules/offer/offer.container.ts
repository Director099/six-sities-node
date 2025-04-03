import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { IController } from '../../libs/rest/index.js';
import { DefaultOfferService } from './default-offer.service.js';
import { IOfferService } from './types/index.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();
  return offerContainer;
}
