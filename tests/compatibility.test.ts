import {
  compatibility as evmCompatibility,
  compatibleLockupVersions as evmCompatibleLockupVersions,
  getCompatibleAirdropsVersions as evmGetCompatibleAirdropsVersions,
  isLockupCompatible as evmIsLockupCompatible,
} from "@src/evm/compatibility";
import { Version as EvmVersion } from "@src/evm/enums";
import {
  compatibility as solanaCompatibility,
  compatibleLockupVersions as solanaCompatibleLockupVersions,
  getCompatibleAirdropsVersions as solanaGetCompatibleAirdropsVersions,
  isLockupCompatible as solanaIsLockupCompatible,
} from "@src/solana/compatibility";
import { Version as SolanaVersion } from "@src/solana/enums";
import { describe, expect, it } from "vitest";

describe("EVM compatibility", () => {
  describe("compatibleLockupVersions", () => {
    it("exports mapping for all Airdrop versions", () => {
      const mappedVersions = Object.keys(evmCompatibleLockupVersions);
      const allAirdropVersions = Object.values(EvmVersion.Airdrops);
      expect(mappedVersions).toHaveLength(allAirdropVersions.length);
      for (const version of allAirdropVersions) {
        expect(evmCompatibleLockupVersions[version]).toBeDefined();
      }
    });

    it("Airdrops v1.1 is compatible with Lockup v1.1 and v1.2", () => {
      expect(evmCompatibleLockupVersions[EvmVersion.Airdrops.V1_1]).toEqual([
        EvmVersion.Lockup.V1_1,
        EvmVersion.Lockup.V1_2,
      ]);
    });

    it("Airdrops v1.2 is compatible with Lockup v1.1 and v1.2", () => {
      expect(evmCompatibleLockupVersions[EvmVersion.Airdrops.V1_2]).toEqual([
        EvmVersion.Lockup.V1_1,
        EvmVersion.Lockup.V1_2,
      ]);
    });

    it("Airdrops v1.3 is compatible with Lockup v2.0", () => {
      expect(evmCompatibleLockupVersions[EvmVersion.Airdrops.V1_3]).toEqual([
        EvmVersion.Lockup.V2_0,
      ]);
    });

    it("Airdrops v2.0 is compatible with Lockup v3.0", () => {
      expect(evmCompatibleLockupVersions[EvmVersion.Airdrops.V2_0]).toEqual([
        EvmVersion.Lockup.V3_0,
      ]);
    });

    it("Lockup v1.0 is not compatible with any Airdrop version", () => {
      for (const lockupVersions of Object.values(evmCompatibleLockupVersions)) {
        expect(lockupVersions).not.toContain(EvmVersion.Lockup.V1_0);
      }
    });
  });

  describe("isLockupCompatible", () => {
    it("returns true for compatible versions", () => {
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_1, EvmVersion.Lockup.V1_1)).toBe(true);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_1, EvmVersion.Lockup.V1_2)).toBe(true);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_2, EvmVersion.Lockup.V1_1)).toBe(true);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_2, EvmVersion.Lockup.V1_2)).toBe(true);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_3, EvmVersion.Lockup.V2_0)).toBe(true);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V2_0, EvmVersion.Lockup.V3_0)).toBe(true);
    });

    it("returns false for incompatible versions", () => {
      // Lockup v1.0 is never compatible
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_1, EvmVersion.Lockup.V1_0)).toBe(false);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V2_0, EvmVersion.Lockup.V1_0)).toBe(false);

      // Cross-version incompatibilities
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_1, EvmVersion.Lockup.V2_0)).toBe(false);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_1, EvmVersion.Lockup.V3_0)).toBe(false);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V1_3, EvmVersion.Lockup.V1_1)).toBe(false);
      expect(evmIsLockupCompatible(EvmVersion.Airdrops.V2_0, EvmVersion.Lockup.V2_0)).toBe(false);
    });
  });

  describe("getCompatibleAirdropsVersions", () => {
    it("returns Airdrops v1.1 and v1.2 for Lockup v1.1", () => {
      expect(evmGetCompatibleAirdropsVersions(EvmVersion.Lockup.V1_1)).toEqual([
        EvmVersion.Airdrops.V1_1,
        EvmVersion.Airdrops.V1_2,
      ]);
    });

    it("returns Airdrops v1.1 and v1.2 for Lockup v1.2", () => {
      expect(evmGetCompatibleAirdropsVersions(EvmVersion.Lockup.V1_2)).toEqual([
        EvmVersion.Airdrops.V1_1,
        EvmVersion.Airdrops.V1_2,
      ]);
    });

    it("returns Airdrops v1.3 for Lockup v2.0", () => {
      expect(evmGetCompatibleAirdropsVersions(EvmVersion.Lockup.V2_0)).toEqual([
        EvmVersion.Airdrops.V1_3,
      ]);
    });

    it("returns Airdrops v2.0 for Lockup v3.0", () => {
      expect(evmGetCompatibleAirdropsVersions(EvmVersion.Lockup.V3_0)).toEqual([
        EvmVersion.Airdrops.V2_0,
      ]);
    });

    it("returns empty array for Lockup v1.0", () => {
      expect(evmGetCompatibleAirdropsVersions(EvmVersion.Lockup.V1_0)).toEqual([]);
    });
  });

  describe("compatibility object", () => {
    it("exports the mapping and helper functions", () => {
      expect(evmCompatibility.compatibleLockupVersions).toBeDefined();
      expect(evmCompatibility.getCompatibleAirdropsVersions).toBeDefined();
      expect(evmCompatibility.isLockupCompatible).toBeDefined();
    });
  });
});

describe("Solana compatibility", () => {
  describe("compatibleLockupVersions", () => {
    it("exports mapping for all Airdrop versions", () => {
      const mappedVersions = Object.keys(solanaCompatibleLockupVersions);
      const allAirdropVersions = Object.values(SolanaVersion.Airdrops);
      expect(mappedVersions).toHaveLength(allAirdropVersions.length);
      for (const version of allAirdropVersions) {
        expect(solanaCompatibleLockupVersions[version]).toBeDefined();
      }
    });

    it("Airdrops v0.1 is compatible with Lockup v0.1", () => {
      expect(solanaCompatibleLockupVersions[SolanaVersion.Airdrops.V0_1]).toEqual([
        SolanaVersion.Lockup.V0_1,
      ]);
    });
  });

  describe("isLockupCompatible", () => {
    // Note: Only v0.1 exists for both protocols, so no negative cases to test yet.
    // When new versions are added, incompatibility tests should be added here.
    it("returns true for compatible versions", () => {
      expect(solanaIsLockupCompatible(SolanaVersion.Airdrops.V0_1, SolanaVersion.Lockup.V0_1)).toBe(
        true,
      );
    });
  });

  describe("getCompatibleAirdropsVersions", () => {
    it("returns Airdrops v0.1 for Lockup v0.1", () => {
      expect(solanaGetCompatibleAirdropsVersions(SolanaVersion.Lockup.V0_1)).toEqual([
        SolanaVersion.Airdrops.V0_1,
      ]);
    });
  });

  describe("compatibility object", () => {
    it("exports the mapping and helper functions", () => {
      expect(solanaCompatibility.compatibleLockupVersions).toBeDefined();
      expect(solanaCompatibility.getCompatibleAirdropsVersions).toBeDefined();
      expect(solanaCompatibility.isLockupCompatible).toBeDefined();
    });
  });
});
