import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {CityNames, ComfortType, HousingType, LocationType} from '../../../types/index.js';
import {
  BedroomsCount,
  DescriptionLength,
  GuestCount,
  IMAGE_REGEX,
  PHOTO_QUANTITY, Price,
  TitleLength
} from '../../../constants/offer.js';
import {AmenitiesList, OfferValidationMessage} from './offer.messages.js';

export class UpdateOfferDto {
  @MinLength(TitleLength.Min, {
    message: OfferValidationMessage.title.minLength,
  })
  @MaxLength(TitleLength.Max, {
    message: OfferValidationMessage.title.maxLength,
  })
  public title: string;

  @MinLength(DescriptionLength.Min, {
    message: OfferValidationMessage.description.minLength,
  })
  @MaxLength(DescriptionLength.Max, {
    message: OfferValidationMessage.description.maxLength,
  })
  public description: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: OfferValidationMessage.date.invalidFormat }
  )
  public date: Date;

  @IsEnum(CityNames, {
    message: OfferValidationMessage.city.invalid,
  })
  public city: CityNames;

  @IsIn(AmenitiesList, {
    each: true,
    message: OfferValidationMessage.comfort.invalid,
  })
  public comfort: ComfortType[];

  @Matches(IMAGE_REGEX, {
    message: OfferValidationMessage.preview.matches,
  })
  public preview: string;

  @IsEnum(HousingType, {
    message: OfferValidationMessage.type.invalid,
  })
  public type: HousingType;

  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(Price.Min, { message: OfferValidationMessage.price.minValue })
  @Max(Price.Max, { message: OfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: OfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(PHOTO_QUANTITY, {
    message: OfferValidationMessage.images.ArraySize,
  })
  @ArrayMaxSize(PHOTO_QUANTITY, {
    message: OfferValidationMessage.images.ArraySize,
  })
  public images: string[];

  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsInt({ message: OfferValidationMessage.bedrooms.invalidFormat })
  @Min(BedroomsCount.Min, {
    message: OfferValidationMessage.bedrooms.minValue,
  })
  @Max(BedroomsCount.Max, {
    message: OfferValidationMessage.bedrooms.maxValue,
  })
  public bedrooms: number;

  @IsInt({ message: OfferValidationMessage.maxAdults.invalidFormat })
  @Min(GuestCount.Min, {
    message: OfferValidationMessage.maxAdults.minValue,
  })
  @Max(GuestCount.Max, {
    message: OfferValidationMessage.maxAdults.maxValue,
  })
  public maxAdults: number;

  @ValidateNested()
  public location: LocationType;
}
