import { inject, injectable } from 'inversify';
import { Component } from '../../../types/index.js';
import { FilePath } from '../../../../rest/index.js';
import { getFullServerPath } from '../../../helpers/index.js';
import { ILogger } from '../../logger/index.js';
import { IConfig, RestSchemaType } from '../../config/index.js';
import { DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS } from './path-transformer.constant.js';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null;
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchemaType>,
  ) {
    this.logger.info('PathTranformer created!');
  }

  #hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  #isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.#isStaticProperty(key) && typeof value === 'string') {
            const staticPath = FilePath.Static;
            const uploadPath = FilePath.Upload;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootPath = this.#hasDefaultImage(value) ? staticPath : uploadPath;
            current[key] = `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
          }
        }
      }
    }

    return data;
  }
}
