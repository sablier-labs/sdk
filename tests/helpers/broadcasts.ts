import type { Sablier } from "@src/types";

/**
 * @notice Determines if a release uses the same broadcast directory for ZK and non-ZK chains.
 *
 * @dev For the earlier versions, deployments on ZK chains were broadcasted using Hardhat while deployments on non-ZK chains
 * used Foundry, which resulted in separate broadcast structures. In the release versions checked here we switched to
 * Foundry for every chain, so the broadcast output is now unified.
 */
export function isBroadcastsUnified(release: Sablier.Release): boolean {
  return (
    ((release.protocol === "airdrops" || release.protocol === "flow") && release.version.startsWith("v2.")) ||
    (release.protocol === "lockup" && release.version.startsWith("v3."))
  );
}
