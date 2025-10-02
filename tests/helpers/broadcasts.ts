import type { Sablier } from "@src/types";

/**
 * @notice Determines if a release uses the same broadcast directory for ZK and non-ZK chains.
 *
 * Previously, deployments on ZK chains used to be made using Hardhat, while deployments on non-ZK chains used Foundry.
 * This resulted in separate broadcast structures. In the release versions checked here we switched to Foundry for
 * every chain, so the broadcast output is now unified.
 */
export function isBroadcastsUnified(release: Sablier.Release): boolean {
  const majorVersion = Number(release.version[1]);
  return (
    (release.protocol === "airdrops" && majorVersion >= 2) ||
    (release.protocol === "flow" && majorVersion >= 2) ||
    (release.protocol === "lockup" && majorVersion >= 3)
  );
}
