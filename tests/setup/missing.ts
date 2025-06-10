import { chains } from "@src/chains";
import lockupV1_1 from "@src/releases/lockup/v1.1/manifest";
import type { Sablier } from "@src/types";
import _ from "lodash";

type ChainMap = Record<number, string[]>;
type VersionMap = Partial<Record<Sablier.Version, ChainMap>>;
type ProtocolMap = Partial<Record<Sablier.Protocol, VersionMap>>;

const MISSING_FLOW: VersionMap = {
  "v1.0": {
    [chains.lightlink.id]: ["all"],
    [chains.zksync.id]: ["all"],
    [chains.zksyncSepolia.id]: ["all"],
  },
  "v1.1": {
    [chains.morphHolesky.id]: ["all"],
    [chains.superseed.id]: ["all"],
    [chains.superseedSepolia.id]: ["all"],
  },
};

const MISSING_LOCKUP: VersionMap = {
  "v1.0": {
    [chains.arbitrumSepolia.id]: ["all"],
  },
  "v1.1": {
    [chains.arbitrum.id]: [lockupV1_1.core.SABLIER_V2_LOCKUP_LINEAR, lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.base.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.blast.id]: [..._.values(lockupV1_1.core)],
    [chains.bsc.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.ethereum.id]: [lockupV1_1.core.SABLIER_V2_LOCKUP_DYNAMIC, lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.gnosis.id]: [lockupV1_1.core.SABLIER_V2_LOCKUP_LINEAR, lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.optimism.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.polygon.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.scroll.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR, ..._.values(lockupV1_1.periphery)],
    [chains.arbitrumSepolia.id]: [lockupV1_1.core.SABLIER_V2_COMPTROLLER, lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.ethereumSepolia.id]: [lockupV1_1.core.SABLIER_V2_NFT_DESCRIPTOR],
    [chains.taikoHekla.id]: ["all"],
    [chains.zksyncSepolia.id]: ["all"],
  },
  "v1.2": {
    [chains.ethereumSepolia.id]: ["all"],
  },
  "v2.0": {
    [chains.coreDao.id]: ["all"],
    [chains.zksync.id]: ["all"],
  },
};

const MISSING_CONTRACTS: ProtocolMap = {
  flow: MISSING_FLOW,
  lockup: MISSING_LOCKUP,
};

// Chains for which we completely lack broadcasts.
export const MISSING_CHAINS: number[] = [chains.iotex.id, chains.ronin.id, chains.tangle.id];

export function isKnownMissing(release: Sablier.Release, chain: Sablier.Chain, contractName: string): boolean {
  if (MISSING_CHAINS.includes(chain.id)) {
    return true;
  }

  const missingContracts = _.get(MISSING_CONTRACTS, [release.protocol, release.version, chain.id]);
  if (_.some(missingContracts, (contract) => contract === "all" || contract === contractName)) {
    return true;
  }

  return false;
}
