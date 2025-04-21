import {IsDateString, IsInt, IsMongoId, IsOptional, IsString, Length, Max, Min} from 'class-validator';
import { Rating, TextLength } from '../../../constants/index.js';
import { CommentMessages } from './comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CommentMessages.description.invalidFormat })
  @Length(TextLength.Min, TextLength.Max, {
    message: CommentMessages.description.lengthField,
  })
  public description: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: CommentMessages.date.invalidFormat }
  )
  public date: Date;

  @IsInt({ message: CommentMessages.rating.invalidFormat })
  @Min(Rating.Min, {
    message: CommentMessages.rating.minValue,
  })
  @Max(Rating.Max, {
    message: CommentMessages.rating.maxValue,
  })
  public rating: number;

  @IsMongoId({message: CommentMessages.offerId.invalidFormat})
  public offerId: string;

  public userId: string;
}
