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
import {CityNames, ComfortType, HousingType, LocationType} from "../../../types/index.js";
import {
  BedroomsCount,
  DescriptionLength,
  GuestCount,
  IMAGE_REGEX,
  PHOTO_QUANTITY, Price,
  TitleLength
} from "../../../constants/offer.js";
import {AmenitiesList, OfferValidationMessage} from "./offer.messages.js";

export class UpdateOfferDto {
  @MinLength(TitleLength.Min, {
    message: OfferValidationMessage.title.minLength,
  })
  @MaxLength(TitleLength.Max, {
    message: OfferValidationMessage.title.maxLength,
  })
  title: string;

  @MinLength(DescriptionLength.Min, {
    message: OfferValidationMessage.description.minLength,
  })
  @MaxLength(DescriptionLength.Max, {
    message: OfferValidationMessage.description.maxLength,
  })
  description: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: OfferValidationMessage.date.invalidFormat }
  )
  date: Date;

  @IsEnum(CityNames, {
    message: OfferValidationMessage.city.invalid,
  })
  city: CityNames;

  @IsIn(AmenitiesList, {
    each: true,
    message: OfferValidationMessage.comfort.invalid,
  })
  comfort: ComfortType[];

  @Matches(IMAGE_REGEX, {
    message: OfferValidationMessage.preview.matches,
  })
  preview: string;

  @IsEnum(HousingType, {
    message: OfferValidationMessage.type.invalid,
  })
  type: HousingType;

  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(Price.Min, { message: OfferValidationMessage.price.minValue })
  @Max(Price.Max, { message: OfferValidationMessage.price.maxValue })
  price: number;

  @IsArray({ message: OfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(PHOTO_QUANTITY, {
    message: OfferValidationMessage.images.ArraySize,
  })
  @ArrayMaxSize(PHOTO_QUANTITY, {
    message: OfferValidationMessage.images.ArraySize,
  })
  images: string[];

  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  isPremium: boolean;

  @IsInt({ message: OfferValidationMessage.bedrooms.invalidFormat })
  @Min(BedroomsCount.Min, {
    message: OfferValidationMessage.bedrooms.minValue,
  })
  @Max(BedroomsCount.Max, {
    message: OfferValidationMessage.bedrooms.maxValue,
  })
  bedrooms: number;

  @IsInt({ message: OfferValidationMessage.maxAdults.invalidFormat })
  @Min(GuestCount.Min, {
    message: OfferValidationMessage.maxAdults.minValue,
  })
  @Max(GuestCount.Max, {
    message: OfferValidationMessage.maxAdults.maxValue,
  })
  maxAdults: number;

  @ValidateNested()
  location: LocationType;
}
