import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import {HostType} from '../../types/index.js';
import {NameLength, DEFAULT_AVATAR} from "../../constants/index.js";
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements HostType {
  @prop({
    required: true,
    unique: true,
    match: [
      /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Email is incorrect'
    ],
  })
  email: string;

  @prop({
    required: false,
    trim: true,
    match: [
      /\.(jpg|png)(\?.*)?$/i,
      'The avatar image must match the format .jpg or .png',
    ],
    default: DEFAULT_AVATAR,
  })
  avatarUrl: string;

  @prop({
    required: true,
    minlength: [NameLength.Min, `Min length for name is ${NameLength.Min}`],
    maxlength: [NameLength.Max, `Max length for name is ${NameLength.Max}`],
    default: '',
  })
  name!: string;

  @prop({ required: true, default: false })
  isPro: boolean;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: HostType) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.isPro = userData.isPro;
    this.avatarUrl = userData.avatarUrl;
  }

  setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
