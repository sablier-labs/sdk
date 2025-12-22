import { taikoHekla } from "@src/evm/chains";
import { deployments as comptrollerDeployments } from "@src/evm/comptroller";
import { releases } from "@src/evm/releases";
import { isBroadcastsUnified } from "@src/internal/helpers";
import { sablier } from "@src/sablier";
import type { Sablier } from "@src/types";
import { describe, expect, it } from "vitest";
import type { StandardBroadcast, ZKBroadcast } from "../types";
import { loadBroadcast, loadComptrollerBroadcast } from "./utils/loaders";

// Create a pseudo release for comptroller to match BroadcastSource type
const comptrollerRelease = {
  deployments: comptrollerDeployments.map((c) => ({ chainId: c.chainId })),
  kind: "standard" as const,
  protocol: "comptroller" as const,
  version: "v1.0" as const,
};

// Full list of releases to test
const releasesToTest: BroadcastSource[] = [
  // Comptroller
  comptrollerRelease,
  // Airdrops
  releases.airdrops["v1.3"],
  releases.airdrops["v2.0"],
  // Flow
  releases.flow["v1.0"],
  releases.flow["v1.1"],
  releases.flow["v2.0"],
  // Lockup
  releases.lockup["v1.0"],
  releases.lockup["v1.1"],
  releases.lockup["v1.2"],
  releases.lockup["v2.0"],
  releases.lockup["v3.0"],
];

// List of deprecated chains to exclude because their RPC no longer works
const excludeDeprecated = [taikoHekla.slug];

type BroadcastSource = Sablier.EVM.Release | typeof comptrollerRelease;

// Test suite to validate broadcasts files
function createTestSuite(source: BroadcastSource): void {
  describe(`${source.protocol} ${source.version}`, () => {
    for (const deployment of source.deployments) {
      const chain = sablier.evm.chains.getOrThrow(deployment.chainId);

      // Exclude deprecated chains
      if (excludeDeprecated.includes(chain.slug)) {
        continue;
      }

      // Comptroller
      if (source.protocol === "comptroller") {
        it(chain.name, async () => {
          const broadcast = await loadComptrollerBroadcast(chain.slug);
          validateStandardBroadcast(broadcast, chain.name);
        });
      }

      // EVM Releases
      else {
        const release = source as Sablier.EVM.Release;
        const isZK = chain.isZK && !isBroadcastsUnified(release);

        if (isZK) {
          if (release.kind === "lockupV1") {
            testZKBroadcast(release, chain, "core");
            testZKBroadcast(release, chain, "periphery");
          } else {
            testZKBroadcast(release, chain);
          }
        } else if (release.kind === "lockupV1") {
          testStandardBroadcast(release, chain, "core");
          testStandardBroadcast(release, chain, "periphery");
        } else {
          testStandardBroadcast(release, chain);
        }
      }
    }
  });
}

// Test standard broadcasts
function testStandardBroadcast(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain,
  componentName = "",
): void {
  it(componentName ? `${componentName} - ${chain.name}` : chain.name, async () => {
    const broadcast = await loadBroadcast<StandardBroadcast>(release, chain, componentName);
    validateStandardBroadcast(broadcast, chain.name);
  });
}

// Validate the structure of a standard broadcast file
function validateStandardBroadcast(broadcast: StandardBroadcast | null, chainName: string): void {
  if (!broadcast) {
    expect.fail(`Broadcast file not found for ${chainName}`);
  }

  // Empty array is acceptable for libraries.
  expect(broadcast.libraries).toBeDefined();

  // Receipts must be non-empty.
  expect(broadcast.receipts).toBeDefined();
  expect(broadcast.receipts.length).toBeGreaterThan(0);

  // Transactions must be non-empty.
  expect(broadcast.transactions).toBeDefined();
  expect(broadcast.transactions.length).toBeGreaterThan(0);

  // Receipts and transactions must match in count.
  expect(broadcast.receipts.length).toBe(broadcast.transactions.length);

  // Returns must be non-empty.
  expect(broadcast.returns).toBeDefined();
}

// Test ZK broadcasts (one JSON file per contract in a directory)
function testZKBroadcast(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain,
  componentName = "",
): void {
  it(componentName ? `${componentName} - ${chain.name} (ZK)` : `${chain.name} (ZK)`, async () => {
    const broadcasts = await loadBroadcast<ZKBroadcast[]>(release, chain, componentName);

    expect(broadcasts, `ZK broadcast directory not found for ${chain.name}`).not.toBeNull();
    expect(broadcasts!.length, `No ZK broadcast files found for ${chain.name}`).toBeGreaterThan(0);

    for (const broadcast of broadcasts!) {
      // Contract name must be defined
      expect(broadcast.contractName).toBeDefined();
      expect(broadcast.contractName.length).toBeGreaterThan(0);

      // Entries must be non-empty
      expect(broadcast.entries).toBeDefined();
      expect(broadcast.entries.length).toBeGreaterThan(0);

      // Each entry must be valid
      for (const entry of broadcast.entries) {
        expect(entry.address).toBeDefined();
        expect(entry.txHash).toBeDefined();
        expect(entry.deploymentType).toBeDefined();
      }
    }
  });
}

describe("Validating broadcast files", () => {
  for (const release of releasesToTest) {
    createTestSuite(release);
  }
});
