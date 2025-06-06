import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import {DEFAULT_AVATAR} from '../../constants/index.js';
import { IUserService } from './types/index.js';
import { UserEntity } from './user.entity.js';
import { CreateUserDto, UpdateUserDto } from './dto/index.js';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({
      ...dto,
      avatarUrl: DEFAULT_AVATAR,
    });
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);
    return result;
  }

  async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);
    if (existedUser) {
      return existedUser;
    }
    return this.create(dto, salt);
  }
}
