import { Version } from "@src/enums";
import { compareVersions, isVersionAfter, isVersionBefore } from "@src/helpers";
import { describe, expect, it } from "vitest";

describe("helpers", () => {
  describe("compareVersions", () => {
    it("returns 0 for equal versions", () => {
      expect(compareVersions(Version.Lockup.V1_0, Version.Lockup.V1_0)).toBe(0);
      expect(compareVersions(Version.Lockup.V2_0, Version.Lockup.V2_0)).toBe(0);
      expect(compareVersions(Version.Flow.V1_1, Version.Flow.V1_1)).toBe(0);
    });

    it("returns negative when first version is older", () => {
      expect(compareVersions(Version.Lockup.V1_0, Version.Lockup.V2_0)).toBeLessThan(0);
      expect(compareVersions(Version.Lockup.V1_1, Version.Lockup.V2_0)).toBeLessThan(0);
      expect(compareVersions(Version.Flow.V1_0, Version.Flow.V2_0)).toBeLessThan(0);
      expect(compareVersions(Version.Airdrops.V1_1, Version.Airdrops.V2_0)).toBeLessThan(0);
    });

    it("returns positive when first version is newer", () => {
      expect(compareVersions(Version.Lockup.V2_0, Version.Lockup.V1_0)).toBeGreaterThan(0);
      expect(compareVersions(Version.Lockup.V2_0, Version.Lockup.V1_1)).toBeGreaterThan(0);
      expect(compareVersions(Version.Flow.V2_0, Version.Flow.V1_0)).toBeGreaterThan(0);
      expect(compareVersions(Version.Airdrops.V2_0, Version.Airdrops.V1_1)).toBeGreaterThan(0);
    });

    it("correctly compares minor version differences", () => {
      expect(compareVersions(Version.Lockup.V1_0, Version.Lockup.V1_1)).toBeLessThan(0);
      expect(compareVersions(Version.Lockup.V1_1, Version.Lockup.V1_2)).toBeLessThan(0);
      expect(compareVersions(Version.Lockup.V1_2, Version.Lockup.V1_1)).toBeGreaterThan(0);
      expect(compareVersions(Version.Flow.V1_0, Version.Flow.V1_1)).toBeLessThan(0);
    });

    it("correctly compares major version differences", () => {
      expect(compareVersions(Version.Lockup.V1_2, Version.Lockup.V2_0)).toBeLessThan(0);
      expect(compareVersions(Version.Lockup.V2_0, Version.Lockup.V3_0)).toBeLessThan(0);
      expect(compareVersions(Version.Lockup.V3_0, Version.Lockup.V2_0)).toBeGreaterThan(0);
    });

    it("works across all protocol versions", () => {
      // Lockup
      expect(compareVersions(Version.Lockup.V1_0, Version.Lockup.V3_0)).toBeLessThan(0);

      // Flow
      expect(compareVersions(Version.Flow.V1_0, Version.Flow.V2_0)).toBeLessThan(0);

      // Airdrops
      expect(compareVersions(Version.Airdrops.V1_1, Version.Airdrops.V2_0)).toBeLessThan(0);

      // Legacy
      expect(compareVersions(Version.Legacy.V1_0, Version.Legacy.V1_1)).toBeLessThan(0);
    });
  });

  describe("isVersionBefore", () => {
    it("returns true when version is before reference", () => {
      expect(isVersionBefore(Version.Lockup.V1_0, Version.Lockup.V2_0)).toBe(true);
      expect(isVersionBefore(Version.Lockup.V1_1, Version.Lockup.V2_0)).toBe(true);
      expect(isVersionBefore(Version.Lockup.V2_0, Version.Lockup.V3_0)).toBe(true);
      expect(isVersionBefore(Version.Flow.V1_0, Version.Flow.V1_1)).toBe(true);
      expect(isVersionBefore(Version.Airdrops.V1_2, Version.Airdrops.V2_0)).toBe(true);
    });

    it("returns false when version is after reference", () => {
      expect(isVersionBefore(Version.Lockup.V2_0, Version.Lockup.V1_0)).toBe(false);
      expect(isVersionBefore(Version.Lockup.V3_0, Version.Lockup.V2_0)).toBe(false);
      expect(isVersionBefore(Version.Flow.V2_0, Version.Flow.V1_0)).toBe(false);
    });

    it("returns false when versions are equal", () => {
      expect(isVersionBefore(Version.Lockup.V2_0, Version.Lockup.V2_0)).toBe(false);
      expect(isVersionBefore(Version.Flow.V1_1, Version.Flow.V1_1)).toBe(false);
    });

    it("handles real-world use case: filtering contracts before V2_0", () => {
      // This is the use case mentioned in the issue
      const versions = [
        Version.Lockup.V1_0,
        Version.Lockup.V1_1,
        Version.Lockup.V1_2,
        Version.Lockup.V2_0,
        Version.Lockup.V3_0,
      ];

      const beforeV2 = versions.filter((v) => isVersionBefore(v, Version.Lockup.V2_0));

      expect(beforeV2).toEqual([Version.Lockup.V1_0, Version.Lockup.V1_1, Version.Lockup.V1_2]);
    });
  });

  describe("isVersionAfter", () => {
    it("returns true when version is after reference", () => {
      expect(isVersionAfter(Version.Lockup.V2_0, Version.Lockup.V1_0)).toBe(true);
      expect(isVersionAfter(Version.Lockup.V2_0, Version.Lockup.V1_1)).toBe(true);
      expect(isVersionAfter(Version.Lockup.V3_0, Version.Lockup.V2_0)).toBe(true);
      expect(isVersionAfter(Version.Flow.V1_1, Version.Flow.V1_0)).toBe(true);
      expect(isVersionAfter(Version.Airdrops.V2_0, Version.Airdrops.V1_2)).toBe(true);
    });

    it("returns false when version is before reference", () => {
      expect(isVersionAfter(Version.Lockup.V1_0, Version.Lockup.V2_0)).toBe(false);
      expect(isVersionAfter(Version.Lockup.V2_0, Version.Lockup.V3_0)).toBe(false);
      expect(isVersionAfter(Version.Flow.V1_0, Version.Flow.V2_0)).toBe(false);
    });

    it("returns false when versions are equal", () => {
      expect(isVersionAfter(Version.Lockup.V2_0, Version.Lockup.V2_0)).toBe(false);
      expect(isVersionAfter(Version.Flow.V1_1, Version.Flow.V1_1)).toBe(false);
    });

    it("handles real-world use case: filtering contracts after V1_1", () => {
      const versions = [Version.Flow.V1_0, Version.Flow.V1_1, Version.Flow.V2_0];

      const afterV1_1 = versions.filter((v) => isVersionAfter(v, Version.Flow.V1_1));

      expect(afterV1_1).toEqual([Version.Flow.V2_0]);
    });
  });
});
