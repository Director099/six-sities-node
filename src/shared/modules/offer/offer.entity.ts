import {defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity} from '@typegoose/typegoose';
import { CityNames, ComfortType, HousingType, LocationType } from '../../types/index.js';
import {TitleLength, DescriptionLength, Rating, Price, BedroomsCount, GuestCount} from '../../constants/index.js';
import {UserEntity} from '../user/index.js';

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
  public title!: string;

  @prop({
    required: true,
    min: BedroomsCount.Min,
    max: BedroomsCount.Max,
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min: GuestCount.Min,
    max: GuestCount.Max,
  })
  public maxAdults!: number;

  @prop({
    type: () => String,
    required: true,
    enum: CityNames,
  })
  public city!: CityNames;

  @prop({
    required: true,
    default: [],
    type: () => [String],
  })
  public comfort!: ComfortType[];

  @prop({required: true, default: Date.now})
  public date!: Date;

  @prop({
    trim: true,
    required: true,
    minlength: DescriptionLength.Min,
    maxlength: DescriptionLength.Max,
  })
  public description!: string;

  @prop({
    type: () => [String],
    default: [],
    required: true,
  })
  public images!: string[];

  @prop({
    require: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    require: true,
    default: false,
  })
  public isFavorite!: boolean;

  @prop({
    required: true,
    trim: true,
    match: [
      /\.(jpg|png)(\?.*)?$/i,
      'The avatar image must match the format .jpg or .png',
    ],
  })
  public preview!: string;

  @prop({
    required: true,
    min: Price.Min,
    max: Price.Max,
  })
  public price!: number;

  @prop({
    required: true,
    min: Rating.Min,
    max: Rating.Max,
  })
  public rating!: number;

  @prop({
    type: () => String,
    required: true,
    enum: HousingType,
  })
  public type: HousingType;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true})
  public location: LocationType;
}

export const OfferModel = getModelForClass(OfferEntity);
