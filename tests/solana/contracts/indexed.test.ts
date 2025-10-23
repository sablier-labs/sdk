import { sablier } from "@src/sablier";
import { contracts } from "@src/solana/contracts";
import { Protocol } from "@src/solana/enums";
import type { Sablier } from "@src/types";
import { describe, expect, it } from "vitest";

/**
 * These contracts are indexed by the Sablier Indexers, so they require a deployment block number.
 * @see https://github.com/sablier-labs/indexers
 */
const INDEXED: Record<Sablier.Solana.Protocol, Set<string>> = {
  [Protocol.Airdrops]: new Set([contracts.names.SABLIER_MERKLE_INSTANT]),
  [Protocol.Lockup]: new Set([contracts.names.SABLIER_LOCKUP_LINEAR]),
};

describe("Indexed contracts have a deployment block number", () => {
  for (const release of sablier.solana.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const contracts = sablier.solana.contracts.getAll({ release })!;

      for (const contract of contracts) {
        if (!INDEXED[release.protocol].has(contract.name)) {
          it.skip(`Skipped ${contract.name} because it's not an indexed contract.`, () => {});
          continue;
        }

        const chain = sablier.solana.chains.getOrThrow(contract.chainId);
        it(`Contract ${contract.name} should have a deployment block number set on ${chain.name}`, () => {
          const errorMsg = `No block number found for ${contract.name}`;
          expect(contract.block, errorMsg).toBeDefined();
        });
      }
    });
  }
});
