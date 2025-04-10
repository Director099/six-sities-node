import {IsDateString, IsInt, IsMongoId, IsOptional, IsString, Length, Max, Min} from 'class-validator';
import { Rating, TextLength } from '../../../constants/index.js';
import { CommentMessages } from './comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CommentMessages.description.invalidFormat })
  @Length(TextLength.Min, TextLength.Max, {
    message: CommentMessages.description.lengthField,
  })
  description: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: CommentMessages.date.invalidFormat }
  )
  date: Date;

  @IsInt({ message: CommentMessages.rating.invalidFormat })
  @Min(Rating.Min, {
    message: CommentMessages.rating.minValue,
  })
  @Max(Rating.Max, {
    message: CommentMessages.rating.maxValue,
  })
  rating: number;

  @IsMongoId({message: CommentMessages.offerId.invalidFormat})
  offerId: string;

  @IsMongoId({message: CommentMessages.userId.invalidFormat})
  userId: string;
}
