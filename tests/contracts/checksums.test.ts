import { sablier } from "@src/sablier";
import { isAddress } from "viem";
import { describe, expect, it } from "vitest";

/**
 * @note Use https://ethsum.netlify.app to fix failing tests
 */
describe("Address checksums", () => {
  for (const release of sablier.evmReleases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const contracts = sablier.evmContracts.getAll({ release })!;

      for (const contract of contracts) {
        it(`${contract.name} should have a checksummed address`, () => {
          const errorMsg = `Found non-checksummed address: ${contract.address}`;
          expect(isAddress(contract.address), errorMsg).toBe(true);
        });
      }
    });
  }
});
