import { resolve } from 'node:path';
import { Logger, pino, transport } from 'pino';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';

@injectable()
export class PinoLogger implements ILogger {
  readonly #logger: Logger;
  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });
    this.#logger = pino({}, multiTransport);
    this.#logger.info('Logger created…');
  }
  debug(message: string, ...args: unknown[]): void {
    this.#logger.debug(message, ...args);
  }
  error(message: string, error: Error, ...args: unknown[]): void {
    this.#logger.error(error, message, ...args);
  }
  info(message: string, ...args: unknown[]): void {
    this.#logger.info(message, ...args);
  }
  warn(message: string, ...args: unknown[]): void {
    this.#logger.warn(message, ...args);
  }
}
