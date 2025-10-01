import type { Sablier } from "@src/types";

/**
 * Determines if a release uses the same broadcast directory for ZK and non-ZK chains.
 */
export function isBroadcastsUnified(release: Sablier.Release): boolean {
  return (
    ((release.protocol === "airdrops" || release.protocol === "flow") && release.version.startsWith("v2.")) ||
    (release.protocol === "lockup" && release.version.startsWith("v3."))
  );
}
