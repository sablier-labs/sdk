#!/usr/bin/env node

import { Command } from "commander";
import { aliasesCmd } from "./commands/print/aliases";
import { chainCmd } from "./commands/print/chains";
import { missingBroadcastsCmd } from "./commands/print/missing-broadcasts";
import { versionsCmd } from "./commands/print/versions";

async function main() {
  const program = new Command();

  program.name("sablier-cli").description("CLI for Sablier deployment utilities");

  // Create the print subcommand
  const printCommand = new Command("print").description("Print various deployment information");

  // Add commands to the print subcommand
  printCommand.addCommand(aliasesCmd);
  printCommand.addCommand(chainCmd);
  printCommand.addCommand(missingBroadcastsCmd);
  printCommand.addCommand(versionsCmd);

  // Add the print command to the main program
  program.addCommand(printCommand);

  // Parse command line arguments
  program.parse();
}

main().catch(console.error);
