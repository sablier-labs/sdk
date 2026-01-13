import { sablierFactoryMerkleInstantAbi } from "./abi/SablierFactoryMerkleInstant.js";
import { sablierFactoryMerkleLLAbi } from "./abi/SablierFactoryMerkleLL.js";
import { sablierFactoryMerkleLTAbi } from "./abi/SablierFactoryMerkleLT.js";
import { sablierFactoryMerkleVCAAbi } from "./abi/SablierFactoryMerkleVCA.js";
import { sablierMerkleInstantAbi } from "./abi/SablierMerkleInstant.js";
import { sablierMerkleLLAbi } from "./abi/SablierMerkleLL.js";
import { sablierMerkleLockupAbi } from "./abi/SablierMerkleLockup.js";
import { sablierMerkleLTAbi } from "./abi/SablierMerkleLT.js";
import { sablierMerkleVCAAbi } from "./abi/SablierMerkleVCA.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: sablierFactoryMerkleInstantAbi,
  [manifest.SABLIER_FACTORY_MERKLE_LL]: sablierFactoryMerkleLLAbi,
  [manifest.SABLIER_FACTORY_MERKLE_LT]: sablierFactoryMerkleLTAbi,
  [manifest.SABLIER_FACTORY_MERKLE_VCA]: sablierFactoryMerkleVCAAbi,
  [manifest.SABLIER_MERKLE_INSTANT]: sablierMerkleInstantAbi,
  [manifest.SABLIER_MERKLE_LL]: sablierMerkleLLAbi,
  [manifest.SABLIER_MERKLE_LOCKUP]: sablierMerkleLockupAbi,
  [manifest.SABLIER_MERKLE_LT]: sablierMerkleLTAbi,
  [manifest.SABLIER_MERKLE_VCA]: sablierMerkleVCAAbi,
} as const;
