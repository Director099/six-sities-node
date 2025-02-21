import { ILogger } from './logger.interface.js';
import { getErrorMessage } from '../../helpers/index.js';

export class ConsoleLogger implements ILogger {
  debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    console.error(message, ...args);
    console.error(`Error message: ${getErrorMessage(error)}`);
  }

  info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }
}
