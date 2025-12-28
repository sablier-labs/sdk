import { Version } from "./enums";

/**
 * Maps each Airdrop version to its compatible Lockup versions.
 *
 * Notes:
 *   - Lockup v1.0 is not supported for airdrops.
 *   - Lockup v1.1/v1.2 is only compatible with Airdrops v1.1/v1.2.
 *   - Lockup v2.0 is only compatible with Airdrops v1.3.
 *   - Lockup v3.0 is only compatible with Airdrops v2.0.
 *
 * @see https://diffchecker.com/KCMfHn3A/
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

export const compatibility = {
  compatibleLockupVersions,
  isLockupCompatible,
};
