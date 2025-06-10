import { logger } from "@src/internal/logger";
import { sablier } from "@src/sablier";
import { Command } from "commander";
import _ from "lodash";

type AliasRow = {
  alias: string;
  contractName: string;
  releaseName: string;
};

async function printAliases(): Promise<void> {
  const rows: AliasRow[] = [];

  for (const release of sablier.releases.getAll()) {
    const releaseName = `${release.protocol} ${release.version}`;
    if (!release.aliases) {
      logger.verbose(`Skipping ${releaseName} because it has no aliases`);
      continue;
    }

    _.forOwn(release.aliases, (alias, contractName) => {
      // Exclude the MerkleFactory from being printed twice in the table
      if (release.protocol === "lockup" && alias.startsWith("MSF")) {
        return;
      }
      rows.push({
        alias,
        contractName,
        releaseName,
      });
    });
  }

  if (rows.length === 0) {
    logger.info("❌ No aliases found");
    return;
  }

  logger.info(`✅ Found ${rows.length} total aliases\n`);

  rows.sort((a, b) => a.alias.localeCompare(b.alias));

  const headers = ["Alias", "Contract Name", "Release"];
  const colWidths = headers.map((h, i) => Math.max(h.length, ...rows.map((row) => _.values(row)[i].length)));

  const headerRow = headers.map((h, i) => h.padEnd(colWidths[i])).join(" | ");
  const sep = colWidths.map((w) => "-".repeat(w)).join("-|-");
  console.log(headerRow);
  console.log(sep);

  for (const row of rows) {
    const cellValues = [row.alias, row.contractName, row.releaseName];
    const content = cellValues.map((v, i) => v.padEnd(colWidths[i])).join(" | ");
    console.log(content);
  }
}

export const aliasesCommand = new Command("aliases")
  .description("Display all contract aliases across releases")
  .action(printAliases);
