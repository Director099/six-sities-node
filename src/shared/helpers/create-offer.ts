import {ComfortType, HousingType, OfferType} from "../types/index.js";

export const createOffer = (offerData: string): OfferType => {
  const [
    title,
    description,
    date,
    preview,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    comfort,
    name,
    email,
    avatarUrl,
    password,
    isPro,
    cityName,
    location,
    commentsDescription,
    commentsDate,
    commentsRating,
  ] = offerData.replace('\n', '').split('\t');

  const host = {
    name,
    email,
    avatarUrl,
    password,
    isPro: Boolean(isPro)
  };

  const city = {
    name: cityName,
    location: {
      latitude: Number(location.split(';')[0]),
      longitude: Number(location.split(';')[1]),
    },
  };

  const comments = {
    description: commentsDescription,
    date: new Date(commentsDate),
    rating: Number(commentsRating),
  };

  return {
    title,
    description,
    date: new Date(date),
    preview,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number(rating),
    type: type as HousingType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    comfort: comfort.split(';') as ComfortType[],
    host,
    city,
    comments,
  };
};
