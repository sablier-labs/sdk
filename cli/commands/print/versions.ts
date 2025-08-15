import { logger } from "@src/internal/logger";
import { sablier } from "@src/sablier";
import { Command } from "commander";
import _ from "lodash";

type VersionRow = {
  protocol: string;
  version: string;
};

async function printVersions(): Promise<void> {
  const rows: VersionRow[] = [];

  for (const release of sablier.releases.getAll()) {
    const protocol = _.capitalize(release.protocol);
    const version = release.version;

    rows.push({
      protocol,
      version,
    });
  }

  if (rows.length === 0) {
    logger.info("❌ No versions found");
    return;
  }

  logger.info(`✅ Found ${rows.length} total versions\n`);

  // Group by protocol
  const groupedByProtocol = _.groupBy(rows, 'protocol');
  
  // Sort protocols alphabetically
  const sortedProtocols = Object.keys(groupedByProtocol).sort();

  for (const protocol of sortedProtocols) {
    const protocolRows = groupedByProtocol[protocol];
    
    // Sort versions from highest to lowest
    protocolRows.sort((a, b) => {
      const parseVersion = (v: string) => {
        const match = v.match(/v(\d+)\.(\d+)/);
        if (!match) return [0, 0];
        return [parseInt(match[1]), parseInt(match[2])];
      };
      
      const [aMajor, aMinor] = parseVersion(a.version);
      const [bMajor, bMinor] = parseVersion(b.version);
      
      if (aMajor !== bMajor) return bMajor - aMajor;
      return bMinor - aMinor;
    });

    // Print protocol header
    console.log(`\n${protocol}:`);
    
    // Calculate column widths for this protocol's table
    const headers = ["Version"];
    const colWidths = headers.map((h, i) => {
      const values = protocolRows.map(row => row.version);
      return Math.max(h.length, ...values.map(v => v.length));
    });

    // Print table header
    const headerRow = headers.map((h, i) => h.padEnd(colWidths[i])).join(" | ");
    const sep = colWidths.map(w => "-".repeat(w)).join(" | ");
    console.log(`| ${headerRow} |`);
    console.log(`| ${sep} |`);

    // Print table rows
    for (const row of protocolRows) {
      const content = row.version.padEnd(colWidths[0]);
      console.log(`| ${content} |`);
    }
  }
}

export const versionsCmd = new Command("versions")
  .description("Display all Sablier protocol versions")
  .action(printVersions);