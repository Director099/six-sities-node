import {readFileSync} from 'node:fs';
import {FileReader} from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  #rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.#rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  toArray() {
    if (!this.#rawData) {
      throw new Error('File was not read');
    }

    return this.#rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        date, preview,
        images, isPremium,
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
      ]) => ({
        title,
        description,
        date: new Date(date),
        preview,
        images: images.split(';'),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number(rating),
        type,
        bedrooms: Number(bedrooms),
        maxAdults: Number(maxAdults),
        price: Number(price),
        comfort: comfort.split(';'),
        host: {
          name,
          email,
          avatarUrl,
          password,
          isPro: Boolean(isPro)
        },
        city: {
          name: cityName,
          location: {
            latitude: location.split(';')[0],
            longitude: location.split(';')[1],
          },
        },
        comments: {
          description: commentsDescription,
          date: new Date(commentsDate),
          rating: Number(commentsRating),
        }
      }));
  }
}

//2022-01-06T08:45:40.283Z	5 	sdfsdf;asdfsadfsadf
