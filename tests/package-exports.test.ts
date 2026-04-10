// Smoke-test the published package surface instead of only the source modules.
//
// Two regressions are easy to miss here:
// 1. `sablier/evm` helper names can disappear from the emitted top-level
//    declaration surface even when runtime exports still exist.
// 2. file-style subpaths like `sablier/evm/helpers` or `sablier/evm/enums`
//    break when `package.json` wildcard exports assume every subpath resolves to
//    `*/index.d.ts`.

import { hasClaimTo, hasOnchainMinFee, hasSponsor, isEvmReleasePayable } from "sablier/evm";
import { Protocol, Version } from "sablier/evm/enums";
import { truncateEvmAddress } from "sablier/evm/helpers";
import { describe, expect, test } from "vitest";

describe("package exports", () => {
  test("sablier/evm re-exports release-feature helpers", () => {
    expect(hasClaimTo(Version.Airdrops.V2_0)).toBe(true);
    expect(hasSponsor(Version.Airdrops.V3_0)).toBe(true);
    expect(hasOnchainMinFee(Protocol.Flow, Version.Flow.V2_0)).toBe(true);
    expect(isEvmReleasePayable(Protocol.Lockup, Version.Lockup.V4_0)).toBe(true);
  });

  test("sablier/evm/helpers subpath resolves", () => {
    expect(truncateEvmAddress("0x1234567890abcdef1234567890abcdef12345678")).toBe("0x1234...5678");
  });

  test("sablier/evm/enums subpath resolves", () => {
    expect(Protocol.Flow).toBeDefined();
    expect(Version.Lockup.V4_0).toBeDefined();
  });

  test("sablier/evm barrel re-exports every sablier/evm/helpers symbol", async () => {
    const evmBarrel = await import("sablier/evm");
    const evmHelpers = await import("sablier/evm/helpers");
    const barrelKeys = new Set(Object.keys(evmBarrel));
    const missing = Object.keys(evmHelpers).filter((key) => !barrelKeys.has(key));
    expect(missing, `sablier/evm is missing helpers: ${missing.join(", ")}`).toEqual([]);
  });
});
