import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { INDEXED } from "../helpers/indexed.js";

describe("Indexed contracts have a deployment block number", () => {
  for (const release of sablier.evm.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const releaseContracts = sablier.evm.contracts.getAll({ release })!;

      for (const contract of releaseContracts) {
        if (!INDEXED[release.protocol].has(contract.name)) {
          it.skip(`Skipped ${contract.name} because it's not an indexed contract.`);
          continue;
        }

        const chain = sablier.evm.chains.getOrThrow(contract.chainId);
        it(`Contract ${contract.name} should have a deployment block number set on ${chain.name}`, () => {
          const errorMsg = `No block number found for ${contract.name}`;
          expect(contract.block, errorMsg).toBeDefined();
        });
      }
    });
  }
});
