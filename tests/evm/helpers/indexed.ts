import { contracts } from "@/src/evm/contracts/index.js";
import { Protocol } from "@/src/evm/enums.js";
import type { Sablier } from "@/src/types.js";

/**
 * These contracts are indexed by the Sablier Indexers, so they require a deployment block number.
 * @see https://github.com/sablier-labs/indexers
 */
export const INDEXED: Record<Sablier.EVM.Protocol, Set<string>> = {
  [Protocol.Airdrops]: new Set([
    contracts.names.SABLIER_MERKLE_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_LOCKUP_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_STREAMER_FACTORY,
    contracts.names.SABLIER_FACTORY_MERKLE_INSTANT,
    contracts.names.SABLIER_FACTORY_MERKLE_LL,
    contracts.names.SABLIER_FACTORY_MERKLE_LT,
    contracts.names.SABLIER_FACTORY_MERKLE_VCA,
  ]),
  [Protocol.Flow]: new Set([contracts.names.SABLIER_FLOW]),
  [Protocol.Bob]: new Set(),
  [Protocol.Legacy]: new Set(),
  [Protocol.Lockup]: new Set([
    contracts.names.SABLIER_V2_LOCKUP_LINEAR,
    contracts.names.SABLIER_V2_LOCKUP_DYNAMIC,
    contracts.names.SABLIER_V2_LOCKUP_TRANCHED,
    contracts.names.SABLIER_LOCKUP,
  ]),
};
