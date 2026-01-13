import { sablierMerkleBaseAbi } from "./abi/SablierMerkleBase.js";
import { sablierMerkleFactoryAbi } from "./abi/SablierMerkleFactory.js";
import { sablierMerkleInstantAbi } from "./abi/SablierMerkleInstant.js";
import { sablierMerkleLLAbi } from "./abi/SablierMerkleLL.js";
import { sablierMerkleLockupAbi } from "./abi/SablierMerkleLockup.js";
import { sablierMerkleLTAbi } from "./abi/SablierMerkleLT.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_MERKLE_BASE]: sablierMerkleBaseAbi,
  [manifest.SABLIER_MERKLE_FACTORY]: sablierMerkleFactoryAbi,
  [manifest.SABLIER_MERKLE_INSTANT]: sablierMerkleInstantAbi,
  [manifest.SABLIER_MERKLE_LOCKUP]: sablierMerkleLockupAbi,
  [manifest.SABLIER_MERKLE_LL]: sablierMerkleLLAbi,
  [manifest.SABLIER_MERKLE_LT]: sablierMerkleLTAbi,
} as const;
