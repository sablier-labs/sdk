import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { allEvmReleases } from "../releases.js";

describe("Contract catalog", () => {
  for (const release of allEvmReleases) {
    it(`should have a valid catalog for ${release.protocol} ${release.version}`, () => {
      const deployment = release.deployments[0];
      const contract = deployment.contracts[0];
      const entry = sablier.evm.contracts.get({
        chainId: deployment.chainId,
        contractName: contract.name,
        release,
      });
      expect(entry).toStrictEqual(contract);
    });
  }
});

describe("alias lookups", () => {
  it("should resolve a contract by alias", () => {
    const contractWithAlias = allEvmReleases
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
