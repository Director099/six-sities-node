import { Expose, Type } from 'class-transformer';
import { CityNames, ComfortType, HousingType, LocationType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  id!: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  date: Date;

  @Expose()
  city: CityNames;

  @Expose()
  preview: string;

  @Expose()
  images: string[];

  @Expose()
  isPremium: boolean;

  @Expose()
  isFavorite: boolean;

  @Expose()
  rating: number;

  @Expose()
  type: HousingType;

  @Expose()
  bedrooms: number;

  @Expose()
  maxAdults: number;

  @Expose()
  price: number;

  @Expose()
  comfort: ComfortType[];

  @Expose()
  commentCount: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  host: UserRdo;

  @Expose()
  location: LocationType;
}
