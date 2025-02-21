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
  avatarUrl: string,
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
  isFavorite: boolean,
  rating: number,
  bedrooms: number,
  maxAdults: number,
  commentCount: number,
  comments: CommentsType,
  location: LocationType
}

//todo это не офер создай отдельный файл
export type MockServerDataType = {
  titles: string[],
  descriptions: string[],
  cityNames: CityNames[],
  comforts: ComfortType[],
  previews: string[],
  types: HousingType[],
  images: string[],
  users: string[]
  avatarUrls: string[],
  emails: string[],
}
