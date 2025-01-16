import { ICommand } from './command.interface.js';
import {TSVFileReader} from "../../shared/libs/file-reader/tsv-file-reader.js";

export class ImportCommand implements ICommand {
  getName() {
    return '--import';
  }

  execute(...params: string[]): void {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
