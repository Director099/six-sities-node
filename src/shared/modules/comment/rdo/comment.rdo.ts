import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class CommentRdo {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  description: string;

  @Expose()
  rating: number;

  @Expose({ name: 'createdAt'})
  date: Date;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  author: UserRdo;
}
