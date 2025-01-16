import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {ICommand} from './command.interface.js';

type PackageJsonConfig = {
  version: string;
}

const isPackageJSONConfig = (value: unknown): value is PackageJsonConfig =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.hasOwn(value, 'version');

export class VersionCommand implements ICommand {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  #readVersion() {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if(!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content');
    }

    return importedContent.version;
  }

  getName() {
    return '--version';
  }

  async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.#readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
