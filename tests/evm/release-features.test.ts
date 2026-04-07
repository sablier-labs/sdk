import { describe, expect, it } from "vitest";
import { Protocol, Version } from "@/src/evm/enums.js";
import {
  getAirdropsReleaseFeatures,
  getFlowReleaseFeatures,
  getLockupReleaseFeatures,
  hasClaimTo,
  hasSponsor,
  supportsLockupBatch,
  supportsLockupPrbProxy,
  usesLockupSplit,
} from "@/src/evm/helpers.js";
import { evmReleaseFeatures } from "@/src/evm/releases/features.js";
import { releases } from "@/src/evm/releases/index.js";
import type { Sablier } from "@/src/types.js";

describe("EVM release features", () => {
  describe("registry completeness", () => {
    it("covers every airdrops version exactly once", () => {
      expect(Object.keys(evmReleaseFeatures[Protocol.Airdrops])).toStrictEqual(
        Object.values(Version.Airdrops)
      );
    });

    it("covers every flow version exactly once", () => {
      expect(Object.keys(evmReleaseFeatures[Protocol.Flow])).toStrictEqual(
        Object.values(Version.Flow)
      );
    });

    it("covers every lockup version exactly once", () => {
      expect(Object.keys(evmReleaseFeatures[Protocol.Lockup])).toStrictEqual(
        Object.values(Version.Lockup)
      );
    });
  });

  describe("release attachment", () => {
    it("attaches airdrops features to exported releases", () => {
      for (const version of Object.values(Version.Airdrops)) {
        expect(releases.airdrops[version].features).toStrictEqual(
          evmReleaseFeatures[Protocol.Airdrops][version]
        );
      }

      const features = releases.airdrops[Version.Airdrops.V3_0]
        .features as Sablier.EVM.AirdropsReleaseFeatures;
      expect(features.claimTo).toBe(true);
      expect(features.sponsor).toBe(true);
    });

    it("attaches flow features to exported releases", () => {
      for (const version of Object.values(Version.Flow)) {
        expect(releases.flow[version].features).toStrictEqual(
          evmReleaseFeatures[Protocol.Flow][version]
        );
      }

      expect(
        (releases.flow[Version.Flow.V1_0].features as Sablier.EVM.FlowReleaseFeatures).payable
      ).toBe(false);
    });

    it("attaches lockup features to exported releases", () => {
      for (const version of Object.values(Version.Lockup)) {
        expect(releases.lockup[version].features).toStrictEqual(
          evmReleaseFeatures[Protocol.Lockup][version]
        );
      }

      const features = releases.lockup[Version.Lockup.V2_0]
        .features as Sablier.EVM.LockupReleaseFeatures;
      expect(features.batch).toBe(true);
      expect(features.legacyAbi).toBe(false);
      expect(features.prbProxy).toBe(false);
    });

    it("attaches empty feature bags to bob and legacy releases", () => {
      expect(releases.bob[Version.Bob.V1_0].features).toStrictEqual({});
      expect(releases.legacy[Version.Legacy.V1_0].features).toStrictEqual({});
      expect(releases.legacy[Version.Legacy.V1_1].features).toStrictEqual({});
    });

    it("freezes the canonical feature registry and attached release bags", () => {
      const airdropsRegistry = evmReleaseFeatures[Protocol.Airdrops];
      const airdropsFeatures = evmReleaseFeatures[Protocol.Airdrops][Version.Airdrops.V3_0];
      const emptyFeatures = evmReleaseFeatures[Protocol.Bob][Version.Bob.V1_0];
      const attachedFeatures = releases.airdrops[Version.Airdrops.V3_0].features;

      expect(Object.isFrozen(evmReleaseFeatures)).toBe(true);
      expect(Object.isFrozen(airdropsRegistry)).toBe(true);
      expect(Object.isFrozen(airdropsFeatures)).toBe(true);
      expect(Object.isFrozen(emptyFeatures)).toBe(true);
      expect(Object.isFrozen(attachedFeatures)).toBe(true);
      expect(attachedFeatures).toBe(airdropsFeatures);
    });
  });

  describe("protocol helpers", () => {
    it("returns the full protocol-specific feature payloads", () => {
      expect(getAirdropsReleaseFeatures(Version.Airdrops.V2_0)).toStrictEqual({
        claimTo: true,
        payable: true,
        sponsor: false,
      });
      expect(getFlowReleaseFeatures(Version.Flow.V1_0)).toStrictEqual({ payable: false });
      expect(getLockupReleaseFeatures(Version.Lockup.V1_0)).toStrictEqual({
        batch: false,
        legacyAbi: true,
        payable: false,
        prbProxy: true,
      });
    });

    it("tracks airdrops claimTo support", () => {
      expect(hasClaimTo(Version.Airdrops.V1_3)).toBe(false);
      expect(hasClaimTo(Version.Airdrops.V2_0)).toBe(true);
    });

    it("tracks airdrops sponsor support", () => {
      expect(hasSponsor(Version.Airdrops.V2_0)).toBe(false);
      expect(hasSponsor(Version.Airdrops.V3_0)).toBe(true);
    });

    it("tracks lockup PRBProxy support", () => {
      expect(supportsLockupPrbProxy(Version.Lockup.V1_0)).toBe(true);
      expect(supportsLockupPrbProxy(Version.Lockup.V1_1)).toBe(false);
    });

    it("tracks lockup batch support", () => {
      expect(supportsLockupBatch(Version.Lockup.V1_2)).toBe(false);
      expect(supportsLockupBatch(Version.Lockup.V2_0)).toBe(true);
    });

    it("tracks lockup split usage", () => {
      expect(usesLockupSplit(Version.Lockup.V1_1)).toBe(true);
      expect(usesLockupSplit(Version.Lockup.V1_2)).toBe(false);
    });
  });
});
