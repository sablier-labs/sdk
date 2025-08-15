import { releases } from "@src/releases";
import { sablier } from "@src/sablier";
import { describe, expect, it } from "vitest";

describe("Contract catalog", () => {
  const releasesToTest = [
    releases.airdrops["v1.3"],
    releases.flow["v1.1"],
    releases.legacy["v1.1"],
    releases.lockup["v2.0"],
  ];

  for (const release of releasesToTest) {
    it(`should have a valid catalog for ${release.protocol} ${release.version}`, () => {
      const deployment = release.deployments[0];
      const contract = deployment.contracts[0];
      const lowercaseAddress = contract.address.toLowerCase();
      const entry = sablier.contracts.get({
        chainId: deployment.chainId,
        contractAddress: lowercaseAddress,
        protocol: release.protocol,
      });
      expect(entry).toStrictEqual(contract);
    });
  }
});
