export enum HousingType {
  Room = 'Room',
  Apartment = 'Apartment',
  House = 'House',
  Hotel = 'Hotel',
}

export enum CityNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export type CommentsType = {
  description: string
  date: Date,
  rating: number,
};

export type ComfortType = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type HostType = {
  isPro: boolean,
  name: string,
  avatarUrl?: string,
  email: string,
};

export type LocationType = {
  latitude: number,
  longitude: number,
}

export type OfferType = {
  title: string,
  description: string,
  date: Date,
  city: CityNames,
  comfort: ComfortType[],
  preview: string,
  type: HousingType,
  price: number,
  images: string[],
  host: HostType,
  isPremium: boolean,
  bedrooms: number,
  maxAdults: number,
  location: LocationType
}
