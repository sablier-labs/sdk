import { Version } from "@src/evm/enums";
import {
  compareVersions as cmp,
  isVersionAfter as isAfter,
  isVersionBefore as isBefore,
  truncateAddress as truncate,
} from "@src/helpers";
import { describe, expect, it } from "vitest";

describe("helpers", () => {
  describe("compareVersions", () => {
    it("returns 0 for equal versions", () => {
      expect(cmp(Version.Lockup.V1_0, Version.Lockup.V1_0)).toBe(0);
      expect(cmp(Version.Lockup.V2_0, Version.Lockup.V2_0)).toBe(0);
      expect(cmp(Version.Flow.V1_1, Version.Flow.V1_1)).toBe(0);
    });

    it("returns negative when first version is older", () => {
      expect(cmp(Version.Lockup.V1_0, Version.Lockup.V2_0)).toBeLessThan(0);
      expect(cmp(Version.Lockup.V1_1, Version.Lockup.V2_0)).toBeLessThan(0);
      expect(cmp(Version.Flow.V1_0, Version.Flow.V2_0)).toBeLessThan(0);
      expect(cmp(Version.Airdrops.V1_1, Version.Airdrops.V2_0)).toBeLessThan(0);
    });

    it("returns positive when first version is newer", () => {
      expect(cmp(Version.Lockup.V2_0, Version.Lockup.V1_0)).toBeGreaterThan(0);
      expect(cmp(Version.Lockup.V2_0, Version.Lockup.V1_1)).toBeGreaterThan(0);
      expect(cmp(Version.Flow.V2_0, Version.Flow.V1_0)).toBeGreaterThan(0);
      expect(cmp(Version.Airdrops.V2_0, Version.Airdrops.V1_1)).toBeGreaterThan(0);
    });

    it("correctly compares minor version differences", () => {
      expect(cmp(Version.Lockup.V1_0, Version.Lockup.V1_1)).toBeLessThan(0);
      expect(cmp(Version.Lockup.V1_1, Version.Lockup.V1_2)).toBeLessThan(0);
      expect(cmp(Version.Lockup.V1_2, Version.Lockup.V1_1)).toBeGreaterThan(0);
      expect(cmp(Version.Flow.V1_0, Version.Flow.V1_1)).toBeLessThan(0);
    });

    it("correctly compares major version differences", () => {
      expect(cmp(Version.Lockup.V1_2, Version.Lockup.V2_0)).toBeLessThan(0);
      expect(cmp(Version.Lockup.V2_0, Version.Lockup.V3_0)).toBeLessThan(0);
      expect(cmp(Version.Lockup.V3_0, Version.Lockup.V2_0)).toBeGreaterThan(0);
    });

    it("works across all protocol versions", () => {
      // Lockup
      expect(cmp(Version.Lockup.V1_0, Version.Lockup.V3_0)).toBeLessThan(0);

      // Flow
      expect(cmp(Version.Flow.V1_0, Version.Flow.V2_0)).toBeLessThan(0);

      // Airdrops
      expect(cmp(Version.Airdrops.V1_1, Version.Airdrops.V2_0)).toBeLessThan(0);

      // Legacy
      expect(cmp(Version.Legacy.V1_0, Version.Legacy.V1_1)).toBeLessThan(0);
    });
  });

  describe("isVersionBefore", () => {
    it("returns true when version is before reference", () => {
      expect(isBefore(Version.Lockup.V1_0, Version.Lockup.V2_0)).toBe(true);
      expect(isBefore(Version.Lockup.V1_1, Version.Lockup.V2_0)).toBe(true);
      expect(isBefore(Version.Lockup.V2_0, Version.Lockup.V3_0)).toBe(true);
      expect(isBefore(Version.Flow.V1_0, Version.Flow.V1_1)).toBe(true);
      expect(isBefore(Version.Airdrops.V1_2, Version.Airdrops.V2_0)).toBe(true);
    });

    it("returns false when version is after reference", () => {
      expect(isBefore(Version.Lockup.V2_0, Version.Lockup.V1_0)).toBe(false);
      expect(isBefore(Version.Lockup.V3_0, Version.Lockup.V2_0)).toBe(false);
      expect(isBefore(Version.Flow.V2_0, Version.Flow.V1_0)).toBe(false);
    });

    it("returns false when versions are equal", () => {
      expect(isBefore(Version.Lockup.V2_0, Version.Lockup.V2_0)).toBe(false);
      expect(isBefore(Version.Flow.V1_1, Version.Flow.V1_1)).toBe(false);
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

      const beforeV2 = versions.filter((v) => isBefore(v, Version.Lockup.V2_0));

      expect(beforeV2).toEqual([Version.Lockup.V1_0, Version.Lockup.V1_1, Version.Lockup.V1_2]);
    });
  });

  describe("isVersionAfter", () => {
    it("returns true when version is after reference", () => {
      expect(isAfter(Version.Lockup.V2_0, Version.Lockup.V1_0)).toBe(true);
      expect(isAfter(Version.Lockup.V2_0, Version.Lockup.V1_1)).toBe(true);
      expect(isAfter(Version.Lockup.V3_0, Version.Lockup.V2_0)).toBe(true);
      expect(isAfter(Version.Flow.V1_1, Version.Flow.V1_0)).toBe(true);
      expect(isAfter(Version.Airdrops.V2_0, Version.Airdrops.V1_2)).toBe(true);
    });

    it("returns false when version is before reference", () => {
      expect(isAfter(Version.Lockup.V1_0, Version.Lockup.V2_0)).toBe(false);
      expect(isAfter(Version.Lockup.V2_0, Version.Lockup.V3_0)).toBe(false);
      expect(isAfter(Version.Flow.V1_0, Version.Flow.V2_0)).toBe(false);
    });

    it("returns false when versions are equal", () => {
      expect(isAfter(Version.Lockup.V2_0, Version.Lockup.V2_0)).toBe(false);
      expect(isAfter(Version.Flow.V1_1, Version.Flow.V1_1)).toBe(false);
    });

    it("handles real-world use case: filtering contracts after V1_1", () => {
      const versions = [Version.Flow.V1_0, Version.Flow.V1_1, Version.Flow.V2_0];

      const afterV1_1 = versions.filter((v) => isAfter(v, Version.Flow.V1_1));

      expect(afterV1_1).toEqual([Version.Flow.V2_0]);
    });
  });

  describe("truncateAddress", () => {
    const validAddress = "0x1234567890abcdef1234567890abcdef12345678";

    it("truncates with default 4 characters per side", () => {
      expect(truncate(validAddress)).toBe("0x1234...5678");
    });

    it("truncates with custom character count", () => {
      expect(truncate(validAddress, 2)).toBe("0x12...78");
      expect(truncate(validAddress, 6)).toBe("0x123456...345678");
      expect(truncate(validAddress, 8)).toBe("0x12345678...12345678");
    });

    it("returns original address if too short to truncate", () => {
      expect(truncate("0x123")).toBe("0x123");
      expect(truncate("0x1234")).toBe("0x1234");
      expect(truncate("0x12345678")).toBe("0x12345678");
      // With chars=4, minLength is 10 (0x + 4 + 4), so length 10 should return original
      expect(truncate("0x12345678")).toBe("0x12345678");
    });

    it("returns original for invalid inputs", () => {
      // Empty string
      expect(truncate("")).toBe("");

      // Just 0x
      expect(truncate("0x")).toBe("0x");
    });

    it("handles edge case with exact minimum length", () => {
      // With chars=4, minLength is 10, so 11 chars should truncate
      expect(truncate("0x123456789")).toBe("0x1234...6789");

      // With chars=6, minLength is 14, so 15 chars should truncate
      expect(truncate("0x1234567890abc", 6)).toBe("0x123456...890abc");
    });

    it("works with real Ethereum addresses", () => {
      // Standard Ethereum address (42 characters)
      const ethAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
      expect(truncate(ethAddress)).toBe("0xd8dA...6045");
      expect(truncate(ethAddress, 6)).toBe("0xd8dA6B...A96045");
    });

    it("preserves case sensitivity", () => {
      const checksumAddress = "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12";
      expect(truncate(checksumAddress)).toBe("0xAbCd...Ef12");
      expect(truncate(checksumAddress, 6)).toBe("0xAbCdEf...CdEf12");
    });

    describe("Solana addresses", () => {
      const solanaAddress = "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK";

      it("truncates Solana address with default 4 characters", () => {
        expect(truncate(solanaAddress)).toBe("DYw8...NSKK");
      });

      it("truncates Solana address with custom character count", () => {
        expect(truncate(solanaAddress, 6)).toBe("DYw8jC...5CNSKK");
        expect(truncate(solanaAddress, 8)).toBe("DYw8jCTf...mG5CNSKK");
      });

      it("returns original if too short", () => {
        expect(truncate("DYw8", 4)).toBe("DYw8");
        expect(truncate("ABC123", 4)).toBe("ABC123");
        expect(truncate("short")).toBe("short");
      });

      it("works with various Solana addresses", () => {
        const anotherSolana = "So11111111111111111111111111111111111111112";
        expect(truncate(anotherSolana)).toBe("So11...1112");
        expect(truncate(anotherSolana, 6)).toBe("So1111...111112");
      });

      it("handles non-0x addresses generically", () => {
        // Any non-0x address is treated as Solana-style
        const genericAddress = "1234567890abcdef1234567890abcdef12345678";
        expect(truncate(genericAddress)).toBe("1234...5678");
        expect(truncate(genericAddress, 6)).toBe("123456...345678");
      });
    });
  });
});
