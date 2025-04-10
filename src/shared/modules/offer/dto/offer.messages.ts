import {formatsObjectToString} from "../../../helpers/common.js";
import {CityNames, HousingType, ComfortType} from "../../../types/offer.type.js";
import {TitleLength, DescriptionLength, PHOTO_QUANTITY, BedroomsCount, GuestCount, Price} from "../../../constants/offer.js";

export const AmenitiesList: ComfortType[] = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
];

export const OfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${TitleLength.Min}`,
    maxLength: `Maximum title length must be ${TitleLength.Max}`,
  },
  description: {
    minLength: `Minimum description length must be ${DescriptionLength.Min}`,
    maxLength: `Maximum description length must be ${DescriptionLength.Max}`,
  },
  date: {
    invalidFormat: 'Field date must be a valid ISO date',
  },
  city: {
    invalid: `City must be one of: ${formatsObjectToString(CityNames)}`,
  },
  preview: {
    matches: 'The image must match the format .jpg or .png',
  },
  images: {
    invalidFormat: 'Photos must be an array',
    ArraySize: `Photos must contain exactly ${PHOTO_QUANTITY} images`,
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be an boolean',
  },
  type: {
    invalid: `House type must be ${formatsObjectToString(HousingType)}`,
  },
  bedrooms: {
    invalidFormat: 'Rooms count must be an integer',
    minValue: `Minimum rooms count is ${BedroomsCount.Min}`,
    maxValue: `Maximum rooms count is ${BedroomsCount.Max}`,
  },
  maxAdults: {
    invalidFormat: 'Guests count must be an integer',
    minValue: `Minimum guests count is ${GuestCount.Min}`,
    maxValue: `Maximum guests count is ${GuestCount.Max}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${Price.Min}`,
    maxValue: `Maximum price is ${Price.Max}`,
  },
  comfort: {
    invalid: `Field amenities must be an array and type must be ${AmenitiesList}`,
  },
  location: {
    invalidLatitude: 'Latitude must be a valid number',
    invalidLongitude: 'Longitude must be a valid number',
  },
  userId: {
    invalidId: 'Field userId must be a valid id',
  },
}
