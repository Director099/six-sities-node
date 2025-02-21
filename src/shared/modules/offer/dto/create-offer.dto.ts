import {CityNames, ComfortType, HousingType, LocationType} from "../../../types/index.js";

export class CreateOfferDto {
  title: string;
  description: string;
  date: Date;
  city: CityNames;
  comfort: ComfortType[];
  preview: string;
  type: HousingType;
  price: number;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  commentCount: number;
  userId: string;
  location: LocationType;
}
