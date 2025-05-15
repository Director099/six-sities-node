import convict from 'convict';
import validator from 'convict-format-with-validator';
import {Env} from '../../constants/index.js';

convict.addFormats(validator);

export type RestSchemaType = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  STATIC_DIRECTORY_PATH: string;
  JWT_SECRET: string;
  HOST: string;
}

export const configRestSchema = convict<RestSchemaType>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: Env.Port,
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: Env.Salt,
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: Env.Host,
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: Env.DbUser,
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: Env.DbPassword,
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: Env.DbPort,
    default: '27017',
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: Env.DbName,
    default: 'six-cities'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: Env.UploadDirectory,
    default: null,
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to directory with static resources',
    format: String,
    env: Env.StaticDirectory,
    default: 'static'
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: Env.JwtSecret,
    default: null
  },
  HOST: {
    doc: 'Host where started service',
    format: String,
    env: Env.Host,
    default: 'localhost'
  },
});
