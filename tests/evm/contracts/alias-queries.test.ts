import { describe, expect, it } from "vitest";
import { Protocol } from "@/src/evm/enums.js";
import { releases } from "@/src/evm/releases/index.js";
import { resolveEvmStreamId } from "@/src/helpers.js";
import { sablier } from "@/src/sablier.js";
import type { Sablier } from "@/src/types.js";

describe("contractsQueries.getByAlias", () => {
  describe("{ alias, chainId }", () => {
    it("should return Lockup v3.0 contract for LK2", () => {
      const release = releases.lockup["v3.0"];
      const deployment = release.deployments[0];
      const contract = deployment.contracts.find((c) => c.alias === "LK2");

      expect(contract).toBeDefined();

      const result = sablier.evm.contracts.getByAlias({
        alias: "LK2",
        chainId: deployment.chainId,
      });

      expect(result).toBeDefined();
      expect(result?.alias).toBe("LK2");
      expect(result?.version).toBe("v3.0");
      expect(result?.address).toBe(contract!.address);
    });

    it("should return Lockup v2.0 contract for LK", () => {
      const release = releases.lockup["v2.0"];
      const deployment = release.deployments[0];
      const contract = deployment.contracts.find((c) => c.alias === "LK");

      expect(contract).toBeDefined();

      const result = sablier.evm.contracts.getByAlias({
        alias: "LK",
        chainId: deployment.chainId,
      });

      expect(result).toBeDefined();
      expect(result?.alias).toBe("LK");
      expect(result?.version).toBe("v2.0");
    });

    it("should return Flow v2.0 contract for FL3", () => {
      const release = releases.flow["v2.0"];
      const deployment = release.deployments[0];
      const contract = deployment.contracts.find((c) => c.alias === "FL3");

      expect(contract).toBeDefined();

      const result = sablier.evm.contracts.getByAlias({
        alias: "FL3",
        chainId: deployment.chainId,
      });

      expect(result).toBeDefined();
      expect(result?.alias).toBe("FL3");
      expect(result?.version).toBe("v2.0");
    });

    it("should return undefined for non-existent alias", () => {
      const result = sablier.evm.contracts.getByAlias({
        alias: "NONEXISTENT",
        chainId: 1,
      });

      expect(result).toBeUndefined();
    });

    it("should return undefined for valid alias on wrong chain", () => {
      const result = sablier.evm.contracts.getByAlias({
        alias: "LK2",
        chainId: 999_999, // Non-existent chain
      });

      expect(result).toBeUndefined();
    });
  });

  describe("{ alias, chainId, protocol }", () => {
    it("should scope search to specific protocol", () => {
      const release = releases.flow["v2.0"];
      const deployment = release.deployments[0];

      const result = sablier.evm.contracts.getByAlias({
        alias: "FL3",
        chainId: deployment.chainId,
        protocol: Protocol.Flow,
      });

      expect(result).toBeDefined();
      expect(result?.protocol).toBe(Protocol.Flow);
      expect(result?.alias).toBe("FL3");
    });

    it("should return undefined when alias not in specified protocol", () => {
      const release = releases.lockup["v3.0"];
      const deployment = release.deployments[0];

      const result = sablier.evm.contracts.getByAlias({
        alias: "LK2",
        chainId: deployment.chainId,
        protocol: Protocol.Flow, // LK2 is in Lockup, not Flow
      });

      expect(result).toBeUndefined();
    });
  });

  describe("multiple aliases on same chain", () => {
    // Find a chain that has both v2.0 and v3.0 deployments
    const v2Release = releases.lockup["v2.0"];
    const v3Release = releases.lockup["v3.0"];
    const v2Deployment = v2Release.deployments[0];
    const v3Deployment = v3Release.deployments.find((d) => d.chainId === v2Deployment.chainId);
    const hasOverlappingChain = Boolean(v3Deployment);

    if (!hasOverlappingChain) {
      it.skip("No overlapping chain found for v2.0 and v3.0 deployments");
      return;
    }

    it("should correctly distinguish between LK and LK2 on the same chain", () => {
      const lkResult = sablier.evm.contracts.getByAlias({
        alias: "LK",
        chainId: v2Deployment.chainId,
      });

      const lk2Result = sablier.evm.contracts.getByAlias({
        alias: "LK2",
        chainId: v2Deployment.chainId,
      });

      expect(lkResult).toBeDefined();
      expect(lk2Result).toBeDefined();
      expect(lkResult?.alias).toBe("LK");
      expect(lk2Result?.alias).toBe("LK2");
      expect(lkResult?.version).toBe("v2.0");
      expect(lk2Result?.version).toBe("v3.0");
      expect(lkResult?.address).not.toBe(lk2Result?.address);
    });
  });

  describe("regression: alias catalog integrity", () => {
    type AliasedContract = {
      address: Sablier.EVM.Address;
      alias: string;
      chainId: number;
      name: string;
      protocol: Sablier.EVM.Protocol;
      version: string;
    };
    const allReleases: Sablier.EVM.Release[] = [];
    for (const byVersion of Object.values(releases)) {
      allReleases.push(...Object.values(byVersion));
    }

    const aliasedContracts: AliasedContract[] = [];
    for (const release of allReleases) {
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
      const lockupRelease = releases.lockup["v3.0"];
      const mainnetDeployment = lockupRelease.deployments.find(
        (deployment: Sablier.EVM.Deployment) => deployment.chainId === 1
      );

      expect(mainnetDeployment).toBeDefined();
      if (!mainnetDeployment) {
        throw new Error("Expected a Lockup v3.0 deployment on mainnet");
      }

      const lk2Contract = mainnetDeployment.contracts.find(
        (contract: Sablier.EVM.Contract) => contract.alias === "LK2"
      );

      expect(lk2Contract).toBeDefined();
      if (!lk2Contract) {
        throw new Error("Expected LK2 alias in Lockup v3.0 mainnet deployment");
      }

      const streamId = resolveEvmStreamId({
        alias: "LK2",
        chainId: 1,
        protocol: Protocol.Lockup,
        tokenId: 1330n,
      });

      expect(streamId).toBe(`${lk2Contract.address.toLowerCase()}-1-1330`);
    });
  });
});
