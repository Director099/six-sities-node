import {NameLength, PasswordLength} from '../../../constants/index.js';

export const UserMessages = {
  name: {
    invalidFormat: 'Name is required',
    lengthField: `Min length is ${NameLength.Min}, max is ${NameLength.Max}`,
  },
  email: {
    invalidFormat: 'Email must be a valid address',
  },
  avatarUrl: {
    matches: 'The image must match the format .jpg or .png',
  },
  isPro: {
    invalid: 'Field isPro must be an boolean',
  },
  password: {
    invalidFormat: 'Password is required',
    lengthField: `Min length for password is ${PasswordLength.Min}, Max is ${PasswordLength.Max}`,
  },
};
