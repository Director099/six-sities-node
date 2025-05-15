import { StatusCodes } from 'http-status-codes';
import { HttpError } from './http-error.js';
import { ValidationErrorFieldType } from '../types/index.js';

export class ValidationError extends HttpError {
  details: ValidationErrorFieldType[] = [];

  constructor(message: string, errors: ValidationErrorFieldType[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}
