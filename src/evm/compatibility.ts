import { Version } from "./enums";

/**
 * Maps each Airdrop version to its compatible Lockup versions.
 *
 * Compatibility is determined by the Lockup contract interface that the Airdrop
 * factory contracts expect when creating merkle campaigns. Different Lockup versions
 * have different stream creation signatures.
 *
 * Notes:
 *   - Lockup v1.0 is not supported for airdrops.
 *   - Lockup v1.1/v1.2 is only compatible with Airdrops v1.1/v1.2.
 *   - Lockup v2.0 is only compatible with Airdrops v1.3.
 *   - Lockup v3.0 is only compatible with Airdrops v2.0.
 *
 * @see https://diffchecker.com/KCMfHn3A/ - Shows interface differences between Lockup versions
 */
export const compatibleLockupVersions: Record<Version.Airdrops, Version.Lockup[]> = {
  [Version.Airdrops.V1_1]: [Version.Lockup.V1_1, Version.Lockup.V1_2],
  [Version.Airdrops.V1_2]: [Version.Lockup.V1_1, Version.Lockup.V1_2],
  [Version.Airdrops.V1_3]: [Version.Lockup.V2_0],
  [Version.Airdrops.V2_0]: [Version.Lockup.V3_0],
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
