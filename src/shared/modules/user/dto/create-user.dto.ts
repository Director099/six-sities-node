import {
  IsBoolean,
  IsEmail,
  IsString,
  Length,
} from 'class-validator';
import { PasswordLength, NameLength } from '../../../constants/index.js';
import { UserMessages } from './user.messages.js';

export class CreateUserDto {
  @IsString({ message: UserMessages.name.invalidFormat })
  @Length(NameLength.Min, NameLength.Max, {
    message: UserMessages.name.lengthField,
  })
  public name: string;

  @IsEmail({}, { message: UserMessages.email.invalidFormat })
  public email: string;

  @IsBoolean({
    message: UserMessages.isPro.invalid,
  })
  public isPro: boolean;

  @IsString({ message: UserMessages.password.invalidFormat })
  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: UserMessages.password.lengthField,
  })
  public password: string;
}
