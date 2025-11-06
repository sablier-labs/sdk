import { sablier } from "@src/sablier";
import { releases } from "@src/solana/releases";
import { describe, expect, it } from "vitest";

const allReleasesToTest = [releases.airdrops["v0.1"], releases.lockup["v0.1"]];

describe("contractsQueries.get", () => {
  describe("{ chainId, contractName, release }", () => {
    for (const release of allReleasesToTest) {
      it("should return contract when found", () => {
        const deployment = release.deployments[0];
        const contract = deployment.programs[0];

        const result = sablier.solana.contracts.get({
          chainId: deployment.chainId,
          contractName: contract.name,
          release,
        });

        expect(result).toStrictEqual(contract);
      });
    }
  });

  describe("{ chainId, contractAddress, protocol }", () => {
    it("should return contract when found in single release", () => {
      const release = allReleasesToTest[0];
      const deployment = release.deployments[0];
      const contract = deployment.programs[0];

      const result = sablier.solana.contracts.get({
        chainId: deployment.chainId,
        contractAddress: contract.address,
        protocol: release.protocol,
      });

      expect(result).toStrictEqual(contract);
    });
  });

  describe("{ chainId, contractAddress, protocol, release }", () => {
    it("should return contract when found", () => {
      const release = allReleasesToTest[0];
      const deployment = release.deployments[0];
      const contract = deployment.programs[0];

      const result = sablier.solana.contracts.get({
        chainId: deployment.chainId,
        contractAddress: contract.address,
        protocol: release.protocol,
        release,
      });

      expect(result).toStrictEqual(contract);
    });
  });

  describe("{ chainId, contractAddress, release }", () => {
    it("should return contract when found", () => {
      const release = allReleasesToTest[0];
      const deployment = release.deployments[0];
      const contract = deployment.programs[0];

      const result = sablier.solana.contracts.get({
        chainId: deployment.chainId,
        contractAddress: contract.address,
        release,
      });

      expect(result).toStrictEqual(contract);
    });
  });
});
