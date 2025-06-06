import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { IUserService } from '../../shared/modules/user/index.js';
import { DefaultOfferService, OfferModel, IOfferService } from '../../shared/modules/offer/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { ILogger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import {OfferType} from '../../shared/types/index.js';

export class ImportCommand implements ICommand {
  #userService: IUserService;
  #offerService: IOfferService;
  #databaseClient: IDatabaseClient;
  #logger: ILogger;
  #salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.#logger = new ConsoleLogger();
    this.#offerService = new DefaultOfferService(this.#logger, OfferModel, UserModel);
    this.#userService = new DefaultUserService(this.#logger, UserModel);
    this.#databaseClient = new MongoDatabaseClient(this.#logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.#saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.#databaseClient.disconnect();
  }

  async #saveOffer(offer: OfferType) {
    const user = await this.#userService.findOrCreate({
      ...offer.host,
      password: DEFAULT_USER_PASSWORD
    }, this.#salt);

    await this.#offerService.create({
      userId: user.id,
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      preview: offer.preview,
      images: offer.images,
      isPremium: offer.isPremium,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      price: offer.price,
      location: offer.location,
      comfort: offer.comfort,
    });
  }

  getName(): string {
    return '--import';
  }

  async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.#salt = salt;

    await this.#databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
