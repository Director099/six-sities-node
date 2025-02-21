import dayjs from 'dayjs';
import {MockServerDataType} from "../../types/index.js";
import { getRandomItem, generateRandomValue, getRandomItems } from '../../helpers/index.js';
import { IOfferGenerator } from './offer-generator.interface.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const Rating = {
  MIN: 0,
  MAX: 5
};

const Bedrooms = {
  MIN: 0,
  MAX: 4
};

const LOCATION = '48.85661;2.351499';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {}

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const cityName = getRandomItem<string>(this.mockData.cityNames);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const comfort = getRandomItems<string>(this.mockData.comforts).join(';');
    const preview = getRandomItem<string>(this.mockData.previews);
    const type = getRandomItem<string>(this.mockData.types);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const userName = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatarUrl = getRandomItem(this.mockData.avatarUrls);
    const isPremium = getRandomItem([true, false]);
    const isFavorite = getRandomItem([true, false]);
    const isPro = getRandomItem([true, false]);
    const rating = getRandomItem([Rating.MIN, Rating.MAX]);
    const bedrooms = getRandomItem([Bedrooms.MIN, Bedrooms.MAX]);
    const maxAdults = generateRandomValue(1, 5);
    const commentsDescription = getRandomItem<string>(this.mockData.commentsDescriptions);
    const commentsCount = generateRandomValue(1, 5);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, createdDate, preview,
      images, isPremium, isFavorite, rating,
      type, bedrooms, maxAdults, price, comfort,
      userName, email, avatarUrl, isPro,
      cityName, LOCATION,
      commentsDescription, createdDate, rating, commentsCount,
    ].join('\t');
  }
}
