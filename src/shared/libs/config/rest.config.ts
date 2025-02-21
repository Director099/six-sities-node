import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { IConfig } from './config.interface.js';
import { ILogger } from '../logger/index.js';
import { configRestSchema, RestSchemaType } from './rest.schema.js';
import { Component } from '../../types/index.js';

@injectable()
export class RestConfig implements IConfig<RestSchemaType> {
  private readonly config: RestSchemaType;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  get<T extends keyof RestSchemaType>(key: T): RestSchemaType[T] {
    return this.config[key];
  }
}
