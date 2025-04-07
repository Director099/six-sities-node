import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string ;

  @Expose()
  avatarUrl: string;

  @Expose()
  isPro: boolean;
}
