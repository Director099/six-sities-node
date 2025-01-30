import {ICommand} from './command.interface.js';
import {TSVFileReader} from '../../shared/libs/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMessage} from '../../shared/helpers/index.js';

export class ImportCommand implements ICommand {
  getName() {
    return '--import';
  }

  onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  async execute(...params: string[]): Promise<void> {
    const [filename] = params;
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
