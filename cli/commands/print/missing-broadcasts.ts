import { Protocol } from "@src/enums";
import { checkBroadcast } from "@src/internal/helpers";
import { logger } from "@src/internal/logger";
import { sablier } from "@src/sablier";
import type { Sablier } from "@src/types";
import { Command } from "commander";
import _ from "lodash";

const EMOJIS = {
  check: "✅",
  cross: "❌",
  folder: "📁",
  mainnet: "🌐",
  testnet: "🧪",
  version: "📦",
  warning: "⚠️",
} as const;

async function checkMissingBroadcasts(protocol: Sablier.Protocol): Promise<void> {
  const missing: Record<string, Sablier.Chain[]> = {};

  console.log(`${EMOJIS.folder} Checking ${protocol} broadcasts...\n`);

  const releases = sablier.releases.getAll({ protocol });
  for (const r of releases) {
    for (const d of r.deployments) {
      const chain = sablier.chains.getOrThrow(d.chainId);

      let hasValidBroadcasts = false;

      if (r.kind === "lockupV1") {
        const components = ["core", "periphery"];
        const results = await Promise.all(components.map((component) => checkBroadcast(r, chain, component)));
        hasValidBroadcasts = results.every(Boolean);
      } else {
        const paths = await checkBroadcast(r, chain);
        hasValidBroadcasts = !_.isEmpty(paths);
      }

      // Add to missing list if broadcasts aren't valid
      if (!hasValidBroadcasts) {
        _.defaults(missing, { [r.version]: [] });
        missing[r.version].push(chain);
      }
    }
  }

  // Output results
  if (_.keys(missing).length === 0) {
    printSectionHeader(`${EMOJIS.check} All listed chains have broadcasts`);
    return;
  }

  // Print warning about missing broadcasts
  printSectionHeader(`${EMOJIS.warning} Missing Broadcasts`);

  // Print results grouped by version
  const versionKeys = _.keys(missing);
  for (let i = 0; i < versionKeys.length; i++) {
    const version = versionKeys[i];
    const versionMissing = missing[version];

    // Add a separator line before each version except the first one
    if (i !== 0) {
      console.log(`${"·".repeat(50)}\n`);
    }

    console.log(`${EMOJIS.version} Version: ${version}`);

    // Group by network type
    const mainnets = versionMissing.filter((c) => !c.isTestnet);
    const testnets = versionMissing.filter((c) => c.isTestnet);

    if (mainnets.length > 0) {
      console.log(`\n${EMOJIS.mainnet} Mainnets:`);
      for (const c of mainnets) {
        console.log(`   ${EMOJIS.cross} ${c.name} (ID ${c.id})`);
      }
    }

    if (testnets.length > 0) {
      console.log(`\n${EMOJIS.testnet} Testnets:`);
      for (const c of testnets) {
        console.log(`   ${EMOJIS.cross} ${c.name} (ID ${c.id})`);
      }
    }

    console.log(); // Empty line between versions
  }

  const totalMissing = _.values(missing).flat().length;
  const mainnetCount = _.values(missing)
    .flat()
    .filter((c) => !c.isTestnet).length;
  const testnetCount = _.values(missing)
    .flat()
    .filter((c) => c.isTestnet).length;

  printSectionHeader("Summary");
  console.log(`Total missing broadcasts: ${totalMissing}`);
  console.log(`${EMOJIS.mainnet} Missing mainnet broadcasts: ${mainnetCount}`);
  console.log(`${EMOJIS.testnet} Missing testnet broadcasts: ${testnetCount}\n`);
}

function printSectionHeader(text: string): void {
  const separator = "═".repeat(50);
  console.log(`\n${separator}`);
  console.log(text);
  console.log(`${separator}\n`);
}

export const missingBroadcastsCommand = new Command("missing-broadcasts")
  .description("Check for missing broadcasts for a given protocol")
  .option("-p, --protocol <protocol>", `Protocol to check (${_.values(Protocol).join(", ")})`)
  .action(async (options: { protocol?: Sablier.Protocol }) => {
    if (!options.protocol) {
      logger.error("Error: Protocol is required. Use -p or --protocol to specify.");
      process.exit(1);
    }

    const available = _.values(Protocol);
    if (!available.includes(options.protocol)) {
      logger.error(`Error: Please provide one of these protocols: ${available.join(", ")}`);
      process.exit(1);
    }

    await checkMissingBroadcasts(options.protocol);
  });
