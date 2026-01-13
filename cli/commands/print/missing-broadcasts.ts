import { Protocol } from "@src/evm/enums.js";
import { checkBroadcast } from "@src/internal/helpers.js";
import { logger } from "@src/internal/logger.js";
import { sablier } from "@src/sablier.js";
import type { Sablier } from "@src/types.js";
import { Command } from "commander";

const EMOJIS = {
  check: "✅",
  cross: "❌",
  folder: "📁",
  mainnet: "🌐",
  testnet: "🧪",
  version: "📦",
  warning: "⚠️",
} as const;

async function checkMissingBroadcasts(protocol: Sablier.EVM.Protocol): Promise<void> {
  const missing: Record<string, Sablier.EVM.Chain[]> = {};

  console.log(`${EMOJIS.folder} Checking ${protocol} broadcasts...\n`);

  const releases = sablier.evm.releases.getAll({ protocol });
  for (const r of releases) {
    for (const d of r.deployments) {
      const chain = sablier.evm.chains.getOrThrow(d.chainId);

      let hasValidBroadcasts = false;

      if (r.kind === "lockupV1") {
        const components = ["core", "periphery"];
        const results = await Promise.all(components.map((c) => checkBroadcast(r, chain, c)));
        hasValidBroadcasts = results.every(Boolean);
      } else {
        const paths = await checkBroadcast(r, chain);
        hasValidBroadcasts = Boolean(paths);
      }

      // Add to missing list if broadcasts aren't valid
      if (!hasValidBroadcasts) {
        if (!missing[r.version]) {
          missing[r.version] = [];
        }
        missing[r.version].push(chain);
      }
    }
  }

  // Output results
  const versionKeys = Object.keys(missing);
  if (versionKeys.length === 0) {
    printSectionHeader(`${EMOJIS.check} All listed chains have broadcasts`);
    return;
  }

  // Print warning about missing broadcasts
  printSectionHeader(`${EMOJIS.warning} Missing Broadcasts`);

  // Print results grouped by version
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

  const allMissing = Object.values(missing).flat();
  const totalMissing = allMissing.length;
  const mainnetCount = allMissing.filter((c) => !c.isTestnet).length;
  const testnetCount = allMissing.filter((c) => c.isTestnet).length;

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

const protocolValues = Object.values(Protocol);

// TODO: make this work for Airdrops v1.1 and v1.2
export const missingBroadcastsCmd = new Command("missing-broadcasts")
  .description("Check for missing broadcasts for a given protocol")
  .option("-p, --protocol <protocol>", `Protocol to check (${protocolValues.join(", ")})`)
  .action(async (options: { protocol?: Sablier.EVM.Protocol }) => {
    if (!options.protocol) {
      logger.error("Error: Protocol is required. Use -p or --protocol to specify.");
      process.exit(1);
    }

    if (!protocolValues.includes(options.protocol as Protocol)) {
      logger.error(`Error: Please provide one of these protocols: ${protocolValues.join(", ")}`);
      process.exit(1);
    }

    await checkMissingBroadcasts(options.protocol);
  });
