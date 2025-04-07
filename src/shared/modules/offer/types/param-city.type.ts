import { ParamsDictionary } from 'express-serve-static-core';
import {CityNames} from '../../../types/index.js';

export type ParamCityType = {
  city: CityNames;
} | ParamsDictionary;
