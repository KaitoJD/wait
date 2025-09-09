#!/usr/bin/env node

import { Command } from 'commander';
import { config } from 'dotenv';
import { registerCommands } from './commands/index';

// Load environment variables
config();

const program = new Command();

program
  .name('weather-cli')
  .description('A CLI application to fetch weather information')
  .version('1.0.0');

// Register all commands
registerCommands(program);

// Parse command line arguments
program.parse(process.argv);