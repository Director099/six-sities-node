import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class CommentRdo {
  @Expose({ name: '_id' })
  public id: string;

  @Expose()
  public description: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'createdAt'})
  public date: Date;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public author: UserRdo;
}
