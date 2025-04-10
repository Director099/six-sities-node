import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { IMAGE_REGEX, PasswordLength, NameLength } from '../../../constants/index.js';
import { UserMessages } from './user.messages.js';

export class CreateUserDto {
  @IsString({ message: UserMessages.name.invalidFormat })
  @Length(NameLength.Min, NameLength.Max, {
    message: UserMessages.name.lengthField,
  })
  name: string;

  @IsEmail({}, { message: UserMessages.email.invalidFormat })
  email: string;

  @IsOptional()
  @Matches(IMAGE_REGEX, {
    message: UserMessages.avatarUrl.matches,
  })
  avatarUrl: string;

  @IsBoolean({
    message: UserMessages.isPro.invalid,
  })
  isPro: boolean;

  @IsString({ message: UserMessages.password.invalidFormat })
  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: UserMessages.password.lengthField,
  })
  password: string;
}
