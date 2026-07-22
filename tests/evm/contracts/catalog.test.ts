import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { expectEntry } from "../../assertions.js";
import { allEvmReleases } from "../releases.js";

describe("Contract catalog", () => {
  for (const release of allEvmReleases) {
    it(`should have a valid catalog for ${release.protocol} ${release.version}`, () => {
      for (const deployment of release.deployments) {
        for (const contract of deployment.contracts) {
          const entry = sablier.evm.contracts.get({
            chainId: deployment.chainId,
            contractName: contract.name,
            release,
          });
          expect(entry).toStrictEqual(contract);
        }
      }
    });
  }
});

describe("alias lookups", () => {
  it("should resolve a contract by alias", () => {
    const contractWithAlias = allEvmReleases
      .flatMap((release) => release.deployments)
      .flatMap((deployment) => deployment.contracts)
      .find((entry) => entry.alias);

    const contract = expectEntry(contractWithAlias, "Expected an aliased EVM contract");
    const resolved = sablier.evm.contracts.getByAlias({
      alias: contract.alias!,
      chainId: contract.chainId,
      protocol: contract.protocol,
    });

    expect(resolved).toStrictEqual(contract);
  });
});
