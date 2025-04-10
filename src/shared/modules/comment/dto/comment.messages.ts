import { TextLength, Rating } from '../../../constants/index.js';

export const CommentMessages = {
  description: {
    invalidFormat: 'Text is required',
    lengthField: `Min length is ${TextLength.Min}, max is ${TextLength.Max}`,
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: `Min length for rating path is ${Rating.Min}`,
    maxValue: `Max length for rating path is ${Rating.Max}`,
  },
  offerId: {
    invalidFormat: 'Field offerId must be a valid id',
  },
  userId: {
    invalidFormat: 'Field userId must be a valid id',
  },
  date: {
    invalidFormat: 'Field date must be a valid ISO date',
  }
};
