import {defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity} from '@typegoose/typegoose';
import { CityNames, ComfortType, HousingType, LocationType } from '../../types/index.js';
import {TitleLength, DescriptionLength, Rating, Price, BedroomsCount, GuestCount} from "../../constants/index.js";
import {UserEntity} from "../user/index.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offer',
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: TitleLength.Min,
    maxlength: TitleLength.Max,
  })
  title!: string;

  @prop({
    required: true,
    min: BedroomsCount.Min,
    max: BedroomsCount.Max,
  })
  bedrooms!: number;

  @prop({
    required: true,
    min: GuestCount.Min,
    max: GuestCount.Max,
  })
  maxAdults!: number;

  @prop({
    type: () => String,
    required: true,
    enum: CityNames,
  })
  city!: CityNames;

  @prop({
    required: true,
    default: [],
    type: () => [String],
  })
  comfort!: ComfortType[];

  @prop({required: true, default: Date.now})
  date!: Date;

  @prop({
    trim: true,
    required: true,
    minlength: DescriptionLength.Min,
    maxlength: DescriptionLength.Max,
  })
  description!: string;

  @prop({
    type: () => [String],
    default: [],
    required: true,
  })
  images!: string[];

  @prop({
    require: true,
    default: false,
  })
  isPremium!: boolean;

  @prop({
    require: true,
    default: false,
  })
  isFavorite!: boolean;

  @prop({
    required: true,
    trim: true,
    match: [
      /\.(jpg|png)(\?.*)?$/i,
      'The avatar image must match the format .jpg or .png',
    ],
  })
  preview!: string;

  @prop({
    required: true,
    min: Price.Min,
    max: Price.Max,
  })
  price!: number;

  @prop({
    required: true,
    min: Rating.Min,
    max: Rating.Max,
  })
  rating!: number;

  @prop({
    type: () => String,
    required: true,
    enum: HousingType,
  })
  type: HousingType;

  @prop({ default: 0 })
  commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  userId!: Ref<UserEntity>;

  @prop({required: true})
  location: LocationType
}

export const OfferModel = getModelForClass(OfferEntity);
