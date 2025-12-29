import { Version } from "./enums";

/**
 * Maps each Airdrop version to its compatible Lockup versions.
 *
 * Compatibility is determined by the Lockup program interface that the Airdrop
 * programs expect when creating merkle campaigns.
 */
export const compatibleLockupVersions: Record<Version.Airdrops, Version.Lockup[]> = {
  [Version.Airdrops.V0_1]: [Version.Lockup.V0_1],
};

/**
 * Checks if a Lockup version is compatible with an Airdrop version.
 */
export function isLockupCompatible(
  airdropsVersion: Version.Airdrops,
  lockupVersion: Version.Lockup,
): boolean {
  return compatibleLockupVersions[airdropsVersion]?.includes(lockupVersion) ?? false;
}

/**
 * Returns all Airdrop versions that are compatible with a given Lockup version.
 */
export function getCompatibleAirdropsVersions(lockupVersion: Version.Lockup): Version.Airdrops[] {
  return Object.entries(compatibleLockupVersions)
    .filter(([, lockups]) => lockups.includes(lockupVersion))
    .map(([airdrops]) => airdrops as Version.Airdrops);
}

export const compatibility = {
  compatibleLockupVersions,
  getCompatibleAirdropsVersions,
  isLockupCompatible,
};
