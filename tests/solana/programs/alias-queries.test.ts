import { sablier } from "@src/sablier";
import { Protocol } from "@src/solana/enums";
import { releases } from "@src/solana/releases";
import { describe, expect, it } from "vitest";

describe("programsQueries.getByAlias", () => {
  describe("{ alias, chainId }", () => {
    it("should return Lockup v0.1 program for LL", () => {
      const release = releases.lockup["v0.1"];
      const deployment = release.deployments[0];
      const program = deployment.programs.find((p) => p.alias === "LL");

      expect(program).toBeDefined();

      const result = sablier.solana.programs.getByAlias({
        alias: "LL",
        chainId: deployment.chainId,
      });

      expect(result).toBeDefined();
      expect(result?.alias).toBe("LL");
      expect(result?.version).toBe("v0.1");
      expect(result?.address).toBe(program!.address);
    });

    it("should return undefined for non-existent alias", () => {
      const result = sablier.solana.programs.getByAlias({
        alias: "NONEXISTENT",
        chainId: 1,
      });

      expect(result).toBeUndefined();
    });

    it("should return undefined for valid alias on wrong chain", () => {
      const result = sablier.solana.programs.getByAlias({
        alias: "LL",
        chainId: 999999, // Non-existent chain
      });

      expect(result).toBeUndefined();
    });
  });

  describe("{ alias, chainId, protocol }", () => {
    it("should scope search to specific protocol", () => {
      const release = releases.lockup["v0.1"];
      const deployment = release.deployments[0];

      const result = sablier.solana.programs.getByAlias({
        alias: "LL",
        chainId: deployment.chainId,
        protocol: Protocol.Lockup,
      });

      expect(result).toBeDefined();
      expect(result?.protocol).toBe(Protocol.Lockup);
      expect(result?.alias).toBe("LL");
    });

    it("should return undefined when alias not in specified protocol", () => {
      const release = releases.lockup["v0.1"];
      const deployment = release.deployments[0];

      const result = sablier.solana.programs.getByAlias({
        alias: "LL",
        chainId: deployment.chainId,
        protocol: Protocol.Airdrops, // LL is in Lockup, not Airdrops
      });

      expect(result).toBeUndefined();
    });
  });
});
