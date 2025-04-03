import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  name: string;

  @Expose()
  email: string ;

  @Expose()
  avatarUrl: string;

  @Expose()
  isPro: boolean;
}
