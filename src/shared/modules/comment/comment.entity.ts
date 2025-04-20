import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import {Rating, TextLength} from '../../constants/index.js';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    type: String,
    required: true,
    minlength: TextLength.Min,
    maxlength: TextLength.Max,
    trim: true,
  })
  description!: string;

  @prop({
    type: Number,
    required: true,
    min: Rating.Min,
    max: Rating.Max,
  })
  rating!: number;

  @prop({
    type: String,
    ref: OfferEntity,
    required: true,
  })
  offerId!: Ref<OfferEntity>;

  @prop({
    type: String,
    required: true,
    ref: UserEntity,
  })
  userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
