import { releases } from "@src/evm/releases";
import { sablier } from "@src/sablier";
import { describe, expect, it } from "vitest";

const releasesWithDuplicateAddresses = [
  releases.flow["v1.1"],
  releases.flow["v2.0"],
  releases.lockup["v2.0"],
  releases.lockup["v3.0"],
];

const releasesWithoutDuplicateAddresses = [
  releases.airdrops["v1.3"],
  releases.airdrops["v2.0"],
  releases.legacy["v1.1"],
];

const allReleasesToTest = [...releasesWithDuplicateAddresses, ...releasesWithoutDuplicateAddresses];

describe("contractsQueries.get", () => {
  describe("{ chainId, contractName, release }", () => {
    for (const release of allReleasesToTest) {
      it("should return contract when found", () => {
        const deployment = release.deployments[0];
        const contract = deployment.contracts[0];

        const result = sablier.evm.contracts.get({
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
      const release = releasesWithoutDuplicateAddresses[0];
      const deployment = release.deployments[0];
      const contract = deployment.contracts[0];

      const result = sablier.evm.contracts.get({
        chainId: deployment.chainId,
        contractAddress: contract.address,
        protocol: release.protocol,
      });

      expect(result).toStrictEqual(contract);
    });

    it("should throw when address exists in multiple releases", () => {
      const release1 = releasesWithDuplicateAddresses[0];
      const release2 = releasesWithDuplicateAddresses[1];

      const deployment1 = release1.deployments[0];
      const deployment2 = release2.deployments[0];

      const descriptor1 = deployment1.contracts.find((c) => c.name.includes("NFTDescriptor"));
      const descriptor2 = deployment2.contracts.find((c) => c.name.includes("NFTDescriptor"));

      expect(descriptor1).toBeDefined();
      expect(descriptor2).toBeDefined();
      expect(descriptor1!.address).toBe(descriptor2!.address);

      expect(() => {
        sablier.evm.contracts.get({
          chainId: deployment1.chainId,
          contractAddress: descriptor1!.address,
          protocol: release1.protocol,
        });
      }).toThrow(/exists in multiple releases/);
    });
  });

  describe("{ chainId, contractAddress, protocol, release }", () => {
    it("should return contract when found", () => {
      const release = allReleasesToTest[0];
      const deployment = release.deployments[0];
      const contract = deployment.contracts[0];

      const result = sablier.evm.contracts.get({
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
      const contract = deployment.contracts[0];

      const result = sablier.evm.contracts.get({
        chainId: deployment.chainId,
        contractAddress: contract.address,
        release,
      });

      expect(result).toStrictEqual(contract);
    });
  });
});
