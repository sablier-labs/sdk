import { Command } from "commander";
import { checkBroadcastsCmd } from "./commands/check-broadcasts.js";
import { aliasesCmd } from "./commands/print/aliases.js";
import { chainCmd } from "./commands/print/chains.js";
import { versionsCmd } from "./commands/print/versions.js";

function main() {
  const program = new Command();

  program.name("sablier-cli").description("CLI for Sablier deployment utilities");

  // Create the print subcommand
  const printCommand = new Command("print").description("Print various deployment information");

  // Add commands to the print subcommand
  printCommand.addCommand(aliasesCmd);
  printCommand.addCommand(chainCmd);
  printCommand.addCommand(versionsCmd);

  // Add commands to the main program
  program.addCommand(checkBroadcastsCmd);
  program.addCommand(printCommand);

  // Parse command line arguments
  program.parse();
}

main();
