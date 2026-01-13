import { sablierV2MerkleLLAbi } from "./abi/SablierV2MerkleLL.js";
import { sablierV2MerkleLockupAbi } from "./abi/SablierV2MerkleLockup.js";
import { sablierV2MerkleLockupFactoryAbi } from "./abi/SablierV2MerkleLockupFactory.js";
import { sablierV2MerkleLTAbi } from "./abi/SablierV2MerkleLT.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_V2_MERKLE_LL]: sablierV2MerkleLLAbi,
  [manifest.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: sablierV2MerkleLockupFactoryAbi,
  [manifest.SABLIER_V2_MERKLE_LOCKUP]: sablierV2MerkleLockupAbi,
  [manifest.SABLIER_V2_MERKLE_LT]: sablierV2MerkleLTAbi,
} as const;
