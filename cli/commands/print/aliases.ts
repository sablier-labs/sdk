import { logger } from "@src/internal/logger.js";
import { sablier } from "@src/sablier.js";
import { Command } from "commander";

type AliasRow = {
  alias: string;
  contractName: string;
  releaseName: string;
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function printAliases(): void {
  const rows: AliasRow[] = [];

  for (const release of sablier.evm.releases.getAll()) {
    const releaseName = `${capitalize(release.protocol)} ${release.version}`;
    if (!release.aliases) {
      logger.verbose(`Skipping ${releaseName} because it has no aliases`);
      continue;
    }

    for (const [contractName, alias] of Object.entries(release.aliases)) {
      // Exclude the MerkleFactory from being printed twice in the table
      if (release.protocol === "lockup" && alias.startsWith("MSF")) {
        continue;
      }
      rows.push({
        alias,
        contractName,
        releaseName,
      });
    }
  }

  if (rows.length === 0) {
    logger.info("❌ No aliases found");
    return;
  }

  logger.info(`✅ Found ${rows.length} total aliases\n`);

  rows.sort((a, b) => a.alias.localeCompare(b.alias));

  const headers = ["Alias", "Contract Name", "Release"];
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((row) => Object.values(row)[i].length))
  );

  // Print Markdown table header with fixed width
  const headerRow = headers.map((h, i) => h.padEnd(colWidths[i])).join(" | ");
  const sep = colWidths.map((w) => "-".repeat(w)).join(" | ");
  console.log(`| ${headerRow} |`);
  console.log(`| ${sep} |`);

  // Print table rows with fixed width
  for (const row of rows) {
    const cellValues = [row.alias, row.contractName, row.releaseName];
    const content = cellValues.map((v, i) => v.padEnd(colWidths[i])).join(" | ");
    console.log(`| ${content} |`);
  }
}

export const aliasesCmd = new Command("aliases")
  .description("Display all contract aliases across releases")
  .action(printAliases);
