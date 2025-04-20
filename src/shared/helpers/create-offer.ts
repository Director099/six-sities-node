import {CityNames, ComfortType, HousingType, OfferType} from '../types/index.js';

export const createOffer = (offerData: string): OfferType => {
  const [
    title, description, date, preview,
    images, isPremium,
    type, bedrooms, maxAdults, price, comfort,
    name, email, avatarUrl, isPro,
    cityName, location,
  ] = offerData.replace('\n', '').split('\t');

  const host = {
    name,
    email,
    avatarUrl,
    isPro: Boolean(isPro)
  };

  return {
    title,
    description,
    date: new Date(date),
    preview,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    type: type as HousingType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    comfort: comfort.split(';') as ComfortType[],
    host,
    city: CityNames[cityName as keyof typeof CityNames],
    location: {
      latitude: Number(location.split(';')[0]),
      longitude: Number(location.split(';')[1]),
    },
  };
};
