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
  public name: string;

  @IsEmail({}, { message: UserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @Matches(IMAGE_REGEX, {
    message: UserMessages.avatarUrl.matches,
  })
  public avatarUrl: string;

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
