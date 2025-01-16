export type ComfortType = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';

export type CityType = {
  name: string,
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
  }
}

export type CommentsType = {
  description: string
  date: Date,
  rating: 5,
};

export type HostType = {
  isPro: boolean,
  name: string,
  avatarUrl: string,
  email: string,
  password: string,
};

export type OfferType = {
  title: string,
  description: string,
  date: Date,
  city: CityType,
  comfort: ComfortType,
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
  comments: CommentsType
}
