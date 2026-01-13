import { releases } from "@src/evm/releases/index.js";
import { sablier } from "@src/sablier.js";
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

describe("alias lookups", () => {
  it("should resolve a contract by alias", () => {
    const releasesList = Object.values(releases).flatMap((byVersion) => Object.values(byVersion));
    const contractWithAlias = releasesList
      .flatMap((release) => release.deployments)
      .flatMap((deployment) => deployment.contracts)
      .find((contract) => contract.alias);

    expect(contractWithAlias).toBeDefined();

    const contract = contractWithAlias!;
    const resolved = sablier.evm.contracts.getByAlias({
      alias: contract.alias!,
      chainId: contract.chainId,
      protocol: contract.protocol,
    });

    expect(resolved).toStrictEqual(contract);
  });
});
