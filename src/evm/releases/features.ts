/**
 * @file Canonical capability registry for every shipped EVM release.
 *
 * Release builders attach these feature bags to exported release objects, and
 * helper functions read from the same registry so version-dependent behavior
 * stays defined in one place.
 */
import { Protocol, Version } from "@/src/evm/enums.js";
import type { Sablier } from "@/src/types.js";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

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

type ProtocolFeatureSet<TProtocol extends keyof EvmReleaseFeatureSetByProtocol> =
  EvmReleaseFeatureSetByProtocol[TProtocol];

type ProtocolWithBooleanFeature<TFeature extends PropertyKey> = {
  [TProtocol in keyof EvmReleaseFeatureSetByProtocol]: ProtocolFeatureSet<TProtocol> extends Record<
    TFeature,
    boolean
  >
    ? TProtocol
    : never;
}[keyof EvmReleaseFeatureSetByProtocol];

type EvmReleaseReference = Pick<Sablier.EVM.Release, "protocol" | "version">;
type PayableEvmReleaseReference = {
  [TProtocol in PayableEvmProtocol]: {
    protocol: TProtocol;
    version: EvmReleaseVersionByProtocol[TProtocol];
  };
}[PayableEvmProtocol];

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) {
    return value;
  }

  for (const nestedValue of Object.values(value as Record<string, unknown>)) {
    deepFreeze(nestedValue);
  }

  return Object.freeze(value);
}

const emptyReleaseFeatures = deepFreeze({} as const satisfies Sablier.EVM.EmptyReleaseFeatures);

/**
 * Protocol/version feature matrix used by both release resolvers and public helpers.
 */
export const evmReleaseFeatures = deepFreeze({
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
    [Version.Lockup.V1_0]: {
      batch: false,
      legacyAbi: true,
      payable: false,
      prbProxy: true,
      shape: false,
    },
    [Version.Lockup.V1_1]: {
      batch: false,
      legacyAbi: true,
      payable: false,
      prbProxy: false,
      shape: false,
    },
    [Version.Lockup.V1_2]: {
      batch: false,
      legacyAbi: false,
      payable: false,
      prbProxy: false,
      shape: false,
    },
    [Version.Lockup.V2_0]: {
      batch: true,
      legacyAbi: false,
      payable: true,
      prbProxy: false,
      shape: true,
    },
    [Version.Lockup.V3_0]: {
      batch: true,
      legacyAbi: false,
      payable: true,
      prbProxy: false,
      shape: true,
    },
    [Version.Lockup.V4_0]: {
      batch: true,
      legacyAbi: false,
      payable: true,
      prbProxy: false,
      shape: true,
    },
  },
} as const satisfies EvmReleaseFeatureRegistry);

export type PayableEvmProtocol = ProtocolWithBooleanFeature<"payable">;

/* -------------------------------------------------------------------------- */
/*                               PRIVATE HELPERS                              */
/* -------------------------------------------------------------------------- */

const evmReleaseFeatureRegistry: EvmReleaseFeatureRegistry = evmReleaseFeatures;

type PayableReleaseFeatureRegistry = {
  [TProtocol in PayableEvmProtocol]: Record<
    EvmReleaseVersionByProtocol[TProtocol],
    Pick<ProtocolFeatureSet<TProtocol>, "payable">
  >;
};

const payableReleaseFeatureRegistry = deepFreeze({
  [Protocol.Airdrops]: evmReleaseFeatures[Protocol.Airdrops],
  [Protocol.Flow]: evmReleaseFeatures[Protocol.Flow],
  [Protocol.Lockup]: evmReleaseFeatures[Protocol.Lockup],
} satisfies PayableReleaseFeatureRegistry);

/**
 * Narrows protocol checks for helpers that only apply to fee-charging releases.
 */
function isPayableEvmProtocol(protocol: Sablier.EVM.Protocol): protocol is PayableEvmProtocol {
  return protocol in payableReleaseFeatureRegistry;
}

/**
 * Narrows a release descriptor to protocols whose feature bag includes a payable flag.
 */
function isPayableEvmRelease(release: EvmReleaseReference): release is PayableEvmReleaseReference {
  return isPayableEvmProtocol(release.protocol);
}

/**
 * Normalizes the supported payable helper overloads to the canonical release shape.
 */
function normalizePayableReleaseInput(
  releaseOrProtocol: EvmReleaseReference | Sablier.EVM.Protocol,
  version?: Sablier.EVM.Version
): EvmReleaseReference {
  if (typeof releaseOrProtocol !== "string") {
    return releaseOrProtocol;
  }

  if (!version) {
    throw new Error('Sablier SDK: Missing "version" for isEvmReleasePayable(protocol, version)');
  }

  return { protocol: releaseOrProtocol, version };
}

/* -------------------------------------------------------------------------- */
/*                                  FEATURES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Returns the protocol-specific feature bag for a single EVM release.
 */
export function getEvmReleaseFeatures<TProtocol extends keyof EvmReleaseFeatureSetByProtocol>(
  protocol: TProtocol,
  version: EvmReleaseVersionByProtocol[TProtocol]
): ReleaseFeaturesForProtocol<TProtocol> {
  return evmReleaseFeatureRegistry[protocol][version] as ReleaseFeaturesForProtocol<TProtocol>;
}

/**
 * Reads the airdrops capability matrix for one released version.
 */
export function getAirdropsReleaseFeatures(
  version: Sablier.EVM.Version.Airdrops
): Sablier.EVM.AirdropsReleaseFeatures {
  return getEvmReleaseFeatures(Protocol.Airdrops, version);
}

/**
 * Reads the flow capability matrix for one released version.
 */
export function getFlowReleaseFeatures(
  version: Sablier.EVM.Version.Flow
): Sablier.EVM.FlowReleaseFeatures {
  return getEvmReleaseFeatures(Protocol.Flow, version);
}

/**
 * Reads the lockup capability matrix for one released version.
 */
export function getLockupReleaseFeatures(
  version: Sablier.EVM.Version.Lockup
): Sablier.EVM.LockupReleaseFeatures {
  return getEvmReleaseFeatures(Protocol.Lockup, version);
}

/**
 * Returns whether a release charges native-token fees on claim or withdraw operations.
 */
export function isEvmReleasePayable(release: EvmReleaseReference): boolean;
/**
 * @deprecated Pass a release object instead. This overload will be removed in the next major version (v4).
 */
export function isEvmReleasePayable(
  protocol: Sablier.EVM.Protocol,
  version: Sablier.EVM.Version
): boolean;
export function isEvmReleasePayable(
  releaseOrProtocol: EvmReleaseReference | Sablier.EVM.Protocol,
  version?: Sablier.EVM.Version
): boolean {
  const release = normalizePayableReleaseInput(releaseOrProtocol, version);

  if (!isPayableEvmRelease(release)) {
    return false;
  }

  const protocolRegistry = payableReleaseFeatureRegistry[release.protocol] as
    | Record<Sablier.EVM.Version, { payable: boolean }>
    | undefined;

  if (!protocolRegistry) {
    return false;
  }

  const releaseFeatures = protocolRegistry[release.version];

  if (!releaseFeatures) {
    return false;
  }

  return releaseFeatures.payable;
}

/**
 * Returns whether the airdrops release supports the `claimTo` function for claiming to a third-party address.
 */
export function hasClaimTo(version: Sablier.EVM.Version.Airdrops): boolean {
  return getAirdropsReleaseFeatures(version).claimTo;
}

/**
 * Returns whether the airdrops release supports sponsor-driven claims.
 */
export function hasSponsor(version: Sablier.EVM.Version.Airdrops): boolean {
  return getAirdropsReleaseFeatures(version).sponsor;
}

/**
 * Returns whether the lockup release exposes batch create or withdraw flows.
 */
export function supportsLockupBatch(version: Sablier.EVM.Version.Lockup): boolean {
  return getLockupReleaseFeatures(version).batch;
}

/**
 * Returns whether the lockup release integrates with PRBProxy.
 */
export function supportsLockupPrbProxy(version: Sablier.EVM.Version.Lockup): boolean {
  return getLockupReleaseFeatures(version).prbProxy;
}

/**
 * Returns whether the lockup release uses the split ABI layout.
 */
export function usesLockupSplit(version: Sablier.EVM.Version.Lockup): boolean {
  return getLockupReleaseFeatures(version).legacyAbi;
}

/**
 * Returns whether the lockup release stores shape as an on-chain parameter.
 */
export function supportsLockupShape(version: Sablier.EVM.Version.Lockup): boolean {
  return getLockupReleaseFeatures(version).shape;
}
