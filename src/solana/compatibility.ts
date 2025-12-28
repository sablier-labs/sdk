import { Version } from "./enums";

/**
 * Maps each Airdrop version to its compatible Lockup versions.
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

export const compatibility = {
  compatibleLockupVersions,
  isLockupCompatible,
};
