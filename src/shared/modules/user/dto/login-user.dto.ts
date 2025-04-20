import {IsString, Length, IsEmail} from 'class-validator';
import {UserMessages} from './user.messages.js';
import {PasswordLength} from '../../../constants/user.js';

export class LoginUserDto {
  @IsEmail({}, { message: UserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: UserMessages.password.invalidFormat })
  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: UserMessages.password.lengthField,
  })
  public password: string;
}
