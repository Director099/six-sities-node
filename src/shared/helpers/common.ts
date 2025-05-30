import chalk from 'chalk';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ApplicationError, ValidationErrorFieldType } from '../libs/rest/index.js';
import {MessageStatus} from '../constants/index.js';
import {CityNames} from '../types/index.js';

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? `${chalk.redBright(MessageStatus.Error)}: ${error.message}` : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorFieldType[] = []) {
  return {errorType, error, details};
}

export function checkString(data: unknown) {
  return typeof data === 'string' && data;
}

export function capitalizeFirstLetter(string: string) {
  return string.trim().charAt(0).toUpperCase() + string.slice(1);
}

export function checkCity(city: string) {
  const formattedCity = capitalizeFirstLetter(city);

  return (
    Object.values(CityNames).includes(formattedCity as CityNames) &&
    (formattedCity as CityNames)
  );
}

export function getNumberOrUndefined(data: unknown) {
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!checkString(data)) {
    return Number.parseFloat(data as string);
  }

  // eslint-disable-next-line no-useless-return
  return;
}

export function formatsObjectToString(obj: Record<string, string>) {
  return Object.values(obj).join(', ');
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorFieldType[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}
