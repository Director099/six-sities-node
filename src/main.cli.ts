#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApplication, GenerateCommand, HelpCommand, VersionCommand, ImportCommand } from './cli/index.js';

const bootstrap = () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
};

bootstrap();
