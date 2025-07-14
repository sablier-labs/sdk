import { contracts } from "@src/contracts";
import { Protocol } from "@src/enums";
import { sablier } from "@src/sablier";
import type { Sablier } from "@src/types";
import _ from "lodash";
import { describe, expect, it } from "vitest";

/**
 * These contracts are indexed by the Sablier Indexers, so they require a deployment block number.
 * @see https://github.com/sablier-labs/indexers
 */
const INDEXED: Record<Sablier.Protocol, Set<string>> = {
  [Protocol.Airdrops]: new Set([
    contracts.names.SABLIER_MERKLE_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_LOCKUP_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_STREAMER_FACTORY,
  ]),
  [Protocol.Flow]: new Set([contracts.names.SABLIER_FLOW]),
  [Protocol.Legacy]: new Set(),
  [Protocol.Lockup]: new Set([
    contracts.names.SABLIER_V2_LOCKUP_LINEAR,
    contracts.names.SABLIER_V2_LOCKUP_DYNAMIC,
    contracts.names.SABLIER_V2_LOCKUP_TRANCHED,
    contracts.names.SABLIER_LOCKUP,
  ]),
};

describe("Indexed contracts have a deployment block number", () => {
  for (const release of sablier.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const contracts = sablier.contracts.getAll({ release })!;

      for (const contract of contracts) {
        if (!INDEXED[release.protocol].has(contract.name)) {
          it.skip(`Skipped ${contract.name} because it's not an indexed contract.`, () => {});
          continue;
        }

        const chain = sablier.chains.getOrThrow(contract.chainId);
        it(`Contract ${contract.name} should have a deployment block number set on ${chain.name}`, () => {
          const errorMsg = `No block number found for ${contract.name}`;
          expect(contract.block, errorMsg).toBeDefined();
        });
      }
    });
  }
});
