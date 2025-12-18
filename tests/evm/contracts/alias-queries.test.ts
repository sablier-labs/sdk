import { Protocol } from "@src/evm/enums";
import { releases } from "@src/evm/releases";
import { sablier } from "@src/sablier";
import { describe, expect, it } from "vitest";

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
        chainId: 999999, // Non-existent chain
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
      it.skip("No overlapping chain found for v2.0 and v3.0 deployments", () => {});
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
});
