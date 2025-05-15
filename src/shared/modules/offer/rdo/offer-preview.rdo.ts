import { Expose } from 'class-transformer';
import {CityNames, ComfortType, HousingType} from '../../../types/index.js';

export class OfferPreviewRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: CityNames;

  @Expose()
  public preview: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public price: number;

  @Expose()
  public comfort: ComfortType[];

  @Expose()
  public commentCount: number;
}
