import { chains } from "@/src/evm/chains/index.js";
import lockupV1_1 from "@/src/evm/releases/lockup/v1.1/manifest.js";
import { getPath } from "@/src/internal/utils/object-path.js";
import type { Sablier } from "@/src/types.js";

type ChainMap = Record<number, string[]>;
type VersionMap = Partial<Record<Sablier.EVM.Version, ChainMap>>;
type ProtocolMap = Partial<Record<Sablier.EVM.Protocol, VersionMap>>;
type InvalidBroadcastMap = Partial<
  Record<Sablier.EVM.Protocol, Partial<Record<Sablier.EVM.Version, number[]>>>
>;

const MISSING_AIRDROPS: VersionMap = {
  "v3.0": {
    [chains.abstract.id]: ["all"],
  },
};

const MISSING_FLOW: VersionMap = {
  "v1.0": {
    [chains.lightlink.id]: ["all"],
    [chains.zksync.id]: ["all"],
    [chains.zksyncSepolia.id]: ["all"],
  },
  "v1.1": {
    [chains.superseed.id]: ["all"],
    [chains.superseedSepolia.id]: ["all"],
  },
  "v3.0": {
    [chains.hyperevm.id]: ["all"],
  },
};

const MISSING_LOCKUP: VersionMap = {
  "v1.0": {
    [chains.arbitrumSepolia.id]: ["all"],
  },
  "v1.1": {
    [chains.mainnet.id]: [
      lockupV1_1.core.SABLIER_V2_LOCKUP_DYNAMIC,
      lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR,
    ],
    [chains.arbitrum.id]: [
      lockupV1_1.core.SABLIER_V2_LOCKUP_LINEAR,
      lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR,
    ],
    [chains.base.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.blast.id]: [...Object.values(lockupV1_1.core)],
    [chains.bsc.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.gnosis.id]: [
      lockupV1_1.core.SABLIER_V2_LOCKUP_LINEAR,
      lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR,
    ],
    [chains.optimism.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.polygon.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.scroll.id]: [
      lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR,
      ...Object.values(lockupV1_1.periphery),
    ],
    [chains.arbitrumSepolia.id]: [
      lockupV1_1.core.SABLIER_V2_COMPTROLLER,
      lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR,
    ],
    [chains.sepolia.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.taikoHekla.id]: ["all"],
    [chains.zksyncSepolia.id]: ["all"],
  },
  "v1.2": {
    [chains.sepolia.id]: ["all"],
  },
  "v2.0": {
    [chains.coreDao.id]: ["all"],
    [chains.zksync.id]: ["all"],
  },
  "v4.0": {
    [chains.mode.id]: ["SablierBatchLockup"],
  },
};

const MISSING_CONTRACTS: ProtocolMap = {
  airdrops: MISSING_AIRDROPS,
  flow: MISSING_FLOW,
  lockup: MISSING_LOCKUP,
};

const INVALID_BROADCASTS: InvalidBroadcastMap = {
  bob: {
    "v1.0": [chains.mainnet.id],
  },
  lockup: {
    "v4.0": [chains.mainnet.id],
  },
};

// chains for which we completely lack broadcasts.
export const MISSING_CHAINS: number[] = [chains.iotex.id, chains.ronin.id, chains.tangle.id];

export function isKnownMissing(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain,
  contractName: string
): boolean {
  if (MISSING_CHAINS.includes(chain.id)) {
    return true;
  }

  const missingContracts = getPath<string[]>(MISSING_CONTRACTS, [
    release.protocol,
    release.version,
    chain.id,
  ]);
  if (missingContracts?.some((contract) => contract === "all" || contract === contractName)) {
    return true;
  }

  return false;
}

export function isKnownInvalidBroadcast(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain
): boolean {
  return (
    getPath<number[]>(INVALID_BROADCASTS, [release.protocol, release.version])?.includes(
      chain.id
    ) ?? false
  );
}
