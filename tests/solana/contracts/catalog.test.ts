import { sablier } from "@src/sablier";
import { releases } from "@src/solana/releases";
import { describe, expect, it } from "vitest";

describe("Contract catalog", () => {
  const releasesToTest = [releases.airdrops["v1.0"], releases.lockup["v1.0"]];

  for (const release of releasesToTest) {
    it(`should have a valid catalog for ${release.protocol} ${release.version}`, () => {
      const deployment = release.deployments[0];
      const contract = deployment.contracts[0];
      const entry = sablier.solana.contracts.get({
        chainId: deployment.chainId,
        contractName: contract.name,
        release: release,
      });
      expect(entry).toStrictEqual(contract);
    });
  }
});
