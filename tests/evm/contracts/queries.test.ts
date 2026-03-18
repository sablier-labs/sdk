import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import type { EvmContractEntry } from "../releases.js";
import { allEvmContractEntries, allEvmReleases } from "../releases.js";

function expectEntry<T>(entry: T | undefined, message: string): T {
  expect(entry).toBeDefined();
  if (!entry) {
    throw new Error(message);
  }

  return entry;
}

function getAddressLookupKey(entry: EvmContractEntry): string {
  return `${entry.release.protocol}:${entry.deployment.chainId}:${entry.contract.address.toLowerCase()}`;
}

const entriesByProtocolChainAndAddress = allEvmContractEntries.reduce((acc, entry) => {
  const key = getAddressLookupKey(entry);
  const existing = acc.get(key) ?? [];
  existing.push(entry);
  acc.set(key, existing);
  return acc;
}, new Map<string, EvmContractEntry[]>());

const uniqueAddressEntry = allEvmContractEntries.find((entry) => {
  const key = getAddressLookupKey(entry);
  return (
    entriesByProtocolChainAndAddress.get(key)?.length === 1 &&
    entry.contract.protocol === entry.release.protocol
  );
});

const duplicateAddressEntries = [...entriesByProtocolChainAndAddress.values()].find(
  (entries) => new Set(entries.map((entry) => entry.release.version)).size > 1
);

describe("contractsQueries.get", () => {
  describe("{ chainId, contractName, release }", () => {
    for (const release of allEvmReleases) {
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
      const contractEntry = expectEntry(
        uniqueAddressEntry,
        "Expected an EVM contract address that exists in only one release"
      );

      const result = sablier.evm.contracts.get({
        chainId: contractEntry.deployment.chainId,
        contractAddress: contractEntry.contract.address,
        protocol: contractEntry.release.protocol,
      });

      expect(result).toStrictEqual(contractEntry.contract);
    });

    it("should throw when address exists in multiple releases", () => {
      const duplicateEntries = expectEntry(
        duplicateAddressEntries,
        "Expected an EVM contract address shared by multiple releases"
      );
      const [firstEntry] = duplicateEntries;

      expect(() => {
        sablier.evm.contracts.get({
          chainId: firstEntry.deployment.chainId,
          contractAddress: firstEntry.contract.address,
          protocol: firstEntry.release.protocol,
        });
      }).toThrow(/exists in multiple releases/);
    });
  });

  describe("{ chainId, contractAddress, protocol, release }", () => {
    it("should return contract when found", () => {
      const contractEntry = allEvmContractEntries[0];
      const { contract, deployment, release } = expectEntry(
        contractEntry,
        "Expected at least one EVM contract entry"
      );

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
      const contractEntry = allEvmContractEntries[0];
      const { contract, deployment, release } = expectEntry(
        contractEntry,
        "Expected at least one EVM contract entry"
      );

      const result = sablier.evm.contracts.get({
        chainId: deployment.chainId,
        contractAddress: contract.address,
        release,
      });

      expect(result).toStrictEqual(contract);
    });
  });
});

describe("contractsQueries.getLatestByName", () => {
  it("should return contract from the latest release", () => {
    const release = sablier.evm.releases.getLatest({ protocol: "lockup" });
    const deployment = release.deployments[0];
    const contract = deployment.contracts[0];

    const result = sablier.evm.contracts.getLatestByName({
      chainId: deployment.chainId,
      contractName: contract.name,
      protocol: release.protocol,
    });

    expect(result).toStrictEqual(contract);
  });
});
