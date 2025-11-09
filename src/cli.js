#!/usr/bin/env node

import {Command} from 'commander';
import path from 'path';
import fs from 'fs';
import {execSync} from 'child_process';
import {fileURLToPath} from 'url';

const cli = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// this is the directory the users project is in
const projectDIR = process.cwd();
const coreDirectory = path.join(__dirname, '../');
const srcDirectory = path.join(__dirname, '../src');

cli
  .command('start')
  .description('Start the Cody server.')
  .action(() => {
    execSync(`npx tsx ${srcDirectory}/cody-server.ts`, {
      cwd: projectDIR,
      stdio: 'inherit',
    });
  });

cli
  .command('init')
  .description('Initialize cody config')
  .action(() => {
    if(fs.existsSync(projectDIR + '/cody.config.ts')) {
      console.warn('A cody.config.ts file exists already in the project root. Init is not needed!');
      process.exit(0);
      return;
    }

    fs.cpSync(coreDirectory + '/cody.config.ts', projectDIR + '/cody.config.ts');

    console.log('Created a fresh cody.config.ts in the project root. Configure your spec hooks in that file to be invoked by Cody.')
    console.log('Learn more about Cody: https://wiki.prooph-board.com/cody/Cody-Server.html')

    process.exit(0);
  })

async function run() {
  cli.parse(process.argv);

  if (!process.argv.slice(2).length) {
    cli.outputHelp();
  }
}

run();

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
