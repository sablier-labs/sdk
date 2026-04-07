import { Protocol, Version } from "@/src/evm/enums.js";
import type { Sablier } from "@/src/types.js";

export type EvmReleaseVersionByProtocol = {
  airdrops: Sablier.EVM.Version.Airdrops;
  bob: Sablier.EVM.Version.Bob;
  flow: Sablier.EVM.Version.Flow;
  legacy: Sablier.EVM.Version.Legacy;
  lockup: Sablier.EVM.Version.Lockup;
};

export type EvmReleaseFeatureSetByProtocol = {
  airdrops: Sablier.EVM.AirdropsReleaseFeatures;
  bob: Sablier.EVM.EmptyReleaseFeatures;
  flow: Sablier.EVM.FlowReleaseFeatures;
  legacy: Sablier.EVM.EmptyReleaseFeatures;
  lockup: Sablier.EVM.LockupReleaseFeatures;
};

type EvmReleaseFeatureRegistry = {
  [TProtocol in keyof EvmReleaseVersionByProtocol]: Record<
    EvmReleaseVersionByProtocol[TProtocol],
    EvmReleaseFeatureSetByProtocol[TProtocol]
  >;
};

export type ReleaseFeaturesForProtocol<TProtocol extends keyof EvmReleaseFeatureSetByProtocol> =
  EvmReleaseFeatureSetByProtocol[TProtocol];

const emptyReleaseFeatures = {} as const satisfies Sablier.EVM.EmptyReleaseFeatures;

export const evmReleaseFeatures = {
  [Protocol.Airdrops]: {
    [Version.Airdrops.V1_1]: { claimTo: false, payable: false, sponsor: false },
    [Version.Airdrops.V1_2]: { claimTo: false, payable: false, sponsor: false },
    [Version.Airdrops.V1_3]: { claimTo: false, payable: true, sponsor: false },
    [Version.Airdrops.V2_0]: { claimTo: true, payable: true, sponsor: false },
    [Version.Airdrops.V3_0]: { claimTo: true, payable: true, sponsor: true },
  },
  [Protocol.Bob]: {
    [Version.Bob.V1_0]: emptyReleaseFeatures,
  },
  [Protocol.Flow]: {
    [Version.Flow.V1_0]: { payable: false },
    [Version.Flow.V1_1]: { payable: true },
    [Version.Flow.V2_0]: { payable: true },
    [Version.Flow.V3_0]: { payable: true },
  },
  [Protocol.Legacy]: {
    [Version.Legacy.V1_0]: emptyReleaseFeatures,
    [Version.Legacy.V1_1]: emptyReleaseFeatures,
  },
  [Protocol.Lockup]: {
    [Version.Lockup.V1_0]: { batch: false, legacyAbi: true, payable: false, prbProxy: true },
    [Version.Lockup.V1_1]: { batch: false, legacyAbi: true, payable: false, prbProxy: false },
    [Version.Lockup.V1_2]: { batch: false, legacyAbi: false, payable: false, prbProxy: false },
    [Version.Lockup.V2_0]: { batch: true, legacyAbi: false, payable: true, prbProxy: false },
    [Version.Lockup.V3_0]: { batch: true, legacyAbi: false, payable: true, prbProxy: false },
    [Version.Lockup.V4_0]: { batch: true, legacyAbi: false, payable: true, prbProxy: false },
  },
} as const satisfies EvmReleaseFeatureRegistry;

export type PayableEvmProtocol = Extract<Sablier.EVM.Protocol, "airdrops" | "flow" | "lockup">;

const evmReleaseFeatureRegistry: EvmReleaseFeatureRegistry = evmReleaseFeatures;
const payableReleaseFeatureRegistry: Record<
  PayableEvmProtocol,
  Record<string, { readonly payable: boolean }>
> = {
  [Protocol.Airdrops]: evmReleaseFeatures[Protocol.Airdrops],
  [Protocol.Flow]: evmReleaseFeatures[Protocol.Flow],
  [Protocol.Lockup]: evmReleaseFeatures[Protocol.Lockup],
};

function isPayableEvmProtocol(protocol: Sablier.EVM.Protocol): protocol is PayableEvmProtocol {
  return protocol in payableReleaseFeatureRegistry;
}

function normalizePayableReleaseInput(
  releaseOrProtocol: Pick<Sablier.EVM.Release, "protocol" | "version"> | PayableEvmProtocol,
  version?: Sablier.EVM.Version
): Pick<Sablier.EVM.Release, "protocol" | "version"> {
  if (typeof releaseOrProtocol !== "string") {
    return releaseOrProtocol;
  }

  if (!version) {
    throw new Error('Sablier SDK: Missing "version" for isEvmReleasePayable(protocol, version)');
  }

  return { protocol: releaseOrProtocol, version };
}

export function getEvmReleaseFeatures<TProtocol extends keyof EvmReleaseFeatureSetByProtocol>(
  protocol: TProtocol,
  version: EvmReleaseVersionByProtocol[TProtocol]
): ReleaseFeaturesForProtocol<TProtocol> {
  return evmReleaseFeatureRegistry[protocol][version] as ReleaseFeaturesForProtocol<TProtocol>;
}

export function getAirdropsReleaseFeatures(
  version: Sablier.EVM.Version.Airdrops
): Sablier.EVM.AirdropsReleaseFeatures {
  return getEvmReleaseFeatures(Protocol.Airdrops, version);
}

export function getFlowReleaseFeatures(
  version: Sablier.EVM.Version.Flow
): Sablier.EVM.FlowReleaseFeatures {
  return getEvmReleaseFeatures(Protocol.Flow, version);
}

export function getLockupReleaseFeatures(
  version: Sablier.EVM.Version.Lockup
): Sablier.EVM.LockupReleaseFeatures {
  return getEvmReleaseFeatures(Protocol.Lockup, version);
}

export function isEvmReleasePayable(
  release: Pick<Sablier.EVM.Release, "protocol" | "version">
): boolean;
/**
 * @deprecated Pass a release object instead. This overload will be removed in the next major version (v4).
 */
export function isEvmReleasePayable(
  protocol: PayableEvmProtocol,
  version: Sablier.EVM.Version
): boolean;
export function isEvmReleasePayable(
  releaseOrProtocol: Pick<Sablier.EVM.Release, "protocol" | "version"> | PayableEvmProtocol,
  version?: Sablier.EVM.Version
): boolean {
  const release = normalizePayableReleaseInput(releaseOrProtocol, version);

  if (!isPayableEvmProtocol(release.protocol)) {
    return false;
  }

  return payableReleaseFeatureRegistry[release.protocol][release.version]?.payable ?? false;
}

export function hasClaimTo(version: Sablier.EVM.Version.Airdrops): boolean {
  return getAirdropsReleaseFeatures(version).claimTo;
}

export function hasSponsor(version: Sablier.EVM.Version.Airdrops): boolean {
  return getAirdropsReleaseFeatures(version).sponsor;
}

export function supportsLockupPrbProxy(version: Sablier.EVM.Version.Lockup): boolean {
  return getLockupReleaseFeatures(version).prbProxy;
}

export function supportsLockupBatch(version: Sablier.EVM.Version.Lockup): boolean {
  return getLockupReleaseFeatures(version).batch;
}

export function usesLegacyLockupAbis(version: Sablier.EVM.Version.Lockup): boolean {
  return getLockupReleaseFeatures(version).legacyAbi;
}
