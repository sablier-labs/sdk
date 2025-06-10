#!/usr/bin/env node

import { Command } from "commander";
import { aliasesCommand } from "./commands/print/aliases";
import { chainCommand } from "./commands/print/chains";
import { missingBroadcastsCommand } from "./commands/print/missing-broadcasts";

const program = new Command();

program.name("sablier-cli").description("CLI for Sablier deployment utilities");

// Create the print subcommand
const printCommand = new Command("print").description("Print various deployment information");

// Add commands to the print subcommand
printCommand.addCommand(aliasesCommand);
printCommand.addCommand(chainCommand);
printCommand.addCommand(missingBroadcastsCommand);

// Add the print command to the main program
program.addCommand(printCommand);

// Parse command line arguments
program.parse();
