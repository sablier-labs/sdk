import { describe, expect, it } from "vitest";
import { Protocol } from "@/src/evm/enums.js";
import { resolveEvmStreamId } from "@/src/helpers.js";
import { sablier } from "@/src/sablier.js";
import type { Sablier } from "@/src/types.js";
import type { AliasedEvmContractEntry } from "../releases.js";
import { allAliasedEvmContractEntries, allEvmReleases } from "../releases.js";

function expectEntry<T>(entry: T | undefined, message: string): T {
  expect(entry).toBeDefined();
  if (!entry) {
    throw new Error(message);
  }

  return entry;
}

const aliasLookupCounts = allAliasedEvmContractEntries.reduce((counts, entry) => {
  const key = `${entry.deployment.chainId}:${entry.contract.alias}`;
  counts.set(key, (counts.get(key) ?? 0) + 1);
  return counts;
}, new Map<string, number>());

const unambiguousAliasedContractEntry = allAliasedEvmContractEntries.find((entry) => {
  const key = `${entry.deployment.chainId}:${entry.contract.alias}`;
  return aliasLookupCounts.get(key) === 1;
});

const aliasedContractEntriesByProtocolAndChain = allAliasedEvmContractEntries.reduce(
  (acc, entry) => {
    const key = `${entry.release.protocol}:${entry.deployment.chainId}`;
    const existing = acc.get(key) ?? [];
    existing.push(entry);
    acc.set(key, existing);
    return acc;
  },
  new Map<string, AliasedEvmContractEntry[]>()
);

const crossReleaseAliasEntries = [...aliasedContractEntriesByProtocolAndChain.values()].find(
  (entries) => {
    return new Set(entries.map((entry) => entry.release.version)).size > 1;
  }
);

const crossReleaseAliasPair = (() => {
  if (!crossReleaseAliasEntries) {
    return undefined;
  }

  const [firstEntry] = crossReleaseAliasEntries;
  if (!firstEntry) {
    return undefined;
  }

  const secondEntry = crossReleaseAliasEntries.find(
    (entry) =>
      entry.release.version !== firstEntry.release.version &&
      entry.contract.alias !== firstEntry.contract.alias
  );

  return secondEntry ? ([firstEntry, secondEntry] as const) : undefined;
})();

describe("contractsQueries.getByAlias", () => {
  describe("{ alias, chainId }", () => {
    it("should return contract for an existing alias", () => {
      const contractEntry = expectEntry(
        unambiguousAliasedContractEntry,
        "Expected an unambiguous aliased EVM contract"
      );

      const result = sablier.evm.contracts.getByAlias({
        alias: contractEntry.contract.alias,
        chainId: contractEntry.deployment.chainId,
      });

      expect(result).toBeDefined();
      expect(result?.alias).toBe(contractEntry.contract.alias);
      expect(result?.version).toBe(contractEntry.release.version);
      expect(result?.address).toBe(contractEntry.contract.address);
    });

    it("should return undefined for non-existent alias", () => {
      const result = sablier.evm.contracts.getByAlias({
        alias: "NONEXISTENT",
        chainId: 1,
      });

      expect(result).toBeUndefined();
    });

    it("should return undefined for valid alias on wrong chain", () => {
      const contractEntry = expectEntry(
        unambiguousAliasedContractEntry,
        "Expected an unambiguous aliased EVM contract"
      );

      const result = sablier.evm.contracts.getByAlias({
        alias: contractEntry.contract.alias,
        chainId: 999_999, // Non-existent chain
      });

      expect(result).toBeUndefined();
    });
  });

  describe("{ alias, chainId, protocol }", () => {
    it("should scope search to specific protocol", () => {
      const contractEntry = expectEntry(
        unambiguousAliasedContractEntry,
        "Expected an unambiguous aliased EVM contract"
      );

      const result = sablier.evm.contracts.getByAlias({
        alias: contractEntry.contract.alias,
        chainId: contractEntry.deployment.chainId,
        protocol: contractEntry.release.protocol,
      });

      expect(result).toBeDefined();
      expect(result?.protocol).toBe(contractEntry.release.protocol);
      expect(result?.alias).toBe(contractEntry.contract.alias);
    });

    it("should return undefined when alias not in specified protocol", () => {
      const contractEntry = expectEntry(
        unambiguousAliasedContractEntry,
        "Expected an unambiguous aliased EVM contract"
      );

      const wrongProtocol = Object.values(Protocol).find(
        (protocol) => protocol !== contractEntry.release.protocol
      );

      const protocol = expectEntry(
        wrongProtocol,
        "Expected a different EVM protocol for alias scoping test"
      );

      const result = sablier.evm.contracts.getByAlias({
        alias: contractEntry.contract.alias,
        chainId: contractEntry.deployment.chainId,
        protocol,
      });

      expect(result).toBeUndefined();
    });
  });

  describe("multiple aliases on same chain", () => {
    if (!crossReleaseAliasPair) {
      it.skip("No chain found with aliased contracts from multiple releases");
      return;
    }

    const [firstEntry, secondEntry] = crossReleaseAliasPair;

    it("should correctly distinguish between aliases from different releases on the same chain", () => {
      const firstResult = sablier.evm.contracts.getByAlias({
        alias: firstEntry.contract.alias,
        chainId: firstEntry.deployment.chainId,
      });

      const secondResult = sablier.evm.contracts.getByAlias({
        alias: secondEntry.contract.alias,
        chainId: secondEntry.deployment.chainId,
      });

      expect(firstResult).toBeDefined();
      expect(secondResult).toBeDefined();
      expect(firstResult?.alias).toBe(firstEntry.contract.alias);
      expect(secondResult?.alias).toBe(secondEntry.contract.alias);
      expect(firstResult?.version).toBe(firstEntry.release.version);
      expect(secondResult?.version).toBe(secondEntry.release.version);
      expect(firstResult?.address).not.toBe(secondResult?.address);
    });
  });

  describe("regression: alias catalog integrity", () => {
    type AliasedContractRecord = {
      address: Sablier.EVM.Address;
      alias: string;
      chainId: number;
      name: string;
      protocol: Sablier.EVM.Protocol;
      version: string;
    };
    const aliasedContracts: AliasedContractRecord[] = [];
    for (const release of allEvmReleases) {
      for (const deployment of release.deployments) {
        for (const contract of deployment.contracts) {
          if (!contract.alias) {
            continue;
          }

          aliasedContracts.push({
            address: contract.address,
            alias: contract.alias,
            chainId: deployment.chainId,
            name: contract.name,
            protocol: release.protocol,
            version: release.version,
          });
        }
      }
    }

    it("rejects duplicate {protocol, chainId, alias} across all EVM releases", () => {
      const seen = new Map<string, { address: string; name: string; version: string }>();
      const collisions: Array<{
        existing: { address: string; name: string; version: string };
        key: string;
        next: { address: string; name: string; version: string };
      }> = [];

      for (const contract of aliasedContracts) {
        const key = `${contract.protocol}:${contract.chainId}:${contract.alias}`;
        const next = {
          address: contract.address,
          name: contract.name,
          version: contract.version,
        };
        const existing = seen.get(key);

        if (existing) {
          collisions.push({
            existing,
            key,
            next,
          });
          continue;
        }

        seen.set(key, next);
      }

      expect(
        collisions,
        collisions.length > 0
          ? `Alias collisions detected:\n${JSON.stringify(collisions, null, 2)}`
          : "Expected no alias collisions"
      ).toHaveLength(0);
    });

    it("resolves every aliased contract via protocol-scoped getByAlias", () => {
      for (const contract of aliasedContracts) {
        const resolved = sablier.evm.contracts.getByAlias({
          alias: contract.alias,
          chainId: contract.chainId,
          protocol: contract.protocol,
        });

        expect(
          resolved,
          `Alias lookup failed for ${contract.protocol}:${contract.chainId}:${contract.alias}`
        ).toBeDefined();
        expect(resolved?.address).toBe(contract.address);
        expect(resolved?.name).toBe(contract.name);
        expect(resolved?.version).toBe(contract.version);
        expect(resolved?.protocol).toBe(contract.protocol);
      }
    });

    it("resolves known vesting stream id path (LK2-1-1330)", () => {
      const lk2ContractEntry = allAliasedEvmContractEntries.find(
        ({ contract, deployment, release }) =>
          contract.alias === "LK2" &&
          deployment.chainId === 1 &&
          release.protocol === Protocol.Lockup
      );

      const contractEntry = expectEntry(lk2ContractEntry, "Expected LK2 alias on Lockup mainnet");

      const streamId = resolveEvmStreamId({
        alias: "LK2",
        chainId: 1,
        protocol: Protocol.Lockup,
        tokenId: 1330n,
      });

      expect(streamId).toBe(`${contractEntry.contract.address.toLowerCase()}-1-1330`);
    });
  });
});
