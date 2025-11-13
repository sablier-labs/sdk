import { releases } from "@src/evm/releases";
import { sablier } from "@src/sablier";
import { describe, expect, it } from "vitest";

describe("Contract catalog", () => {
  const releasesToTest = [
    releases.airdrops["v1.3"],
    releases.airdrops["v2.0"],
    releases.flow["v1.1"],
    releases.flow["v2.0"],
    releases.legacy["v1.1"],
    releases.lockup["v2.0"],
    releases.lockup["v3.0"],
  ];

  for (const release of releasesToTest) {
    it(`should have a valid catalog for ${release.protocol} ${release.version}`, () => {
      const deployment = release.deployments[0];
      const contract = deployment.contracts[0];
      const entry = sablier.evm.contracts.get({
        chainId: deployment.chainId,
        contractName: contract.name,
        release: release,
      });
      expect(entry).toStrictEqual(contract);
    });
  }
});
