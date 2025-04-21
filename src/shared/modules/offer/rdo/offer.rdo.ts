import { Expose, Type } from 'class-transformer';
import { CityNames, ComfortType, HousingType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

class LocationRdo {
  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;
}

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: CityNames;

  @Expose()
  public preview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public comfort: ComfortType[];

  @Expose()
  public commentCount: number;

  @Expose()
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  @Type(() => LocationRdo)
  public location: LocationRdo;
}
