import { sablier } from "@src/sablier";
import { Protocol } from "@src/solana/enums";
import { programs } from "@src/solana/programs";
import type { Sablier } from "@src/types";
import { describe, expect, it } from "vitest";

/**
 * These programs are indexed by the Sablier Indexers, so they require a deployment block number.
 * @see https://github.com/sablier-labs/indexers
 */
const INDEXED: Record<Sablier.Solana.Protocol, Set<string>> = {
  [Protocol.Airdrops]: new Set([programs.names.SABLIER_MERKLE_INSTANT]),
  [Protocol.Lockup]: new Set([programs.names.SABLIER_LOCKUP_LINEAR]),
};

describe("Indexed programs have a deployment block number", () => {
  for (const release of sablier.solana.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const programs = sablier.solana.programs.getAll({ release })!;

      for (const program of programs) {
        if (!INDEXED[release.protocol].has(program.name)) {
          it.skip(`Skipped ${program.name} because it's not an indexed program.`, () => {});
          continue;
        }

        const chain = sablier.solana.chains.getOrThrow(program.chainId);
        it(`Program ${program.name} should have a deployment block number set on ${chain.name}`, () => {
          const errorMsg = `No block number found for ${program.name}`;
          expect(program.block, errorMsg).toBeDefined();
        });
      }
    });
  }
});
