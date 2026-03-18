import { sablierFactoryMerkleExecuteAbi } from "./abi/SablierFactoryMerkleExecute.js";
import { sablierFactoryMerkleInstantAbi } from "./abi/SablierFactoryMerkleInstant.js";
import { sablierFactoryMerkleLLAbi } from "./abi/SablierFactoryMerkleLL.js";
import { sablierFactoryMerkleLTAbi } from "./abi/SablierFactoryMerkleLT.js";
import { sablierFactoryMerkleVCAAbi } from "./abi/SablierFactoryMerkleVCA.js";
import { sablierMerkleExecuteAbi } from "./abi/SablierMerkleExecute.js";
import { sablierMerkleInstantAbi } from "./abi/SablierMerkleInstant.js";
import { sablierMerkleLLAbi } from "./abi/SablierMerkleLL.js";
import { sablierMerkleLTAbi } from "./abi/SablierMerkleLT.js";
import { sablierMerkleVCAAbi } from "./abi/SablierMerkleVCA.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: sablierFactoryMerkleExecuteAbi,
  [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: sablierFactoryMerkleInstantAbi,
  [manifest.SABLIER_FACTORY_MERKLE_LL]: sablierFactoryMerkleLLAbi,
  [manifest.SABLIER_FACTORY_MERKLE_LT]: sablierFactoryMerkleLTAbi,
  [manifest.SABLIER_FACTORY_MERKLE_VCA]: sablierFactoryMerkleVCAAbi,
  [manifest.SABLIER_MERKLE_EXECUTE]: sablierMerkleExecuteAbi,
  [manifest.SABLIER_MERKLE_INSTANT]: sablierMerkleInstantAbi,
  [manifest.SABLIER_MERKLE_LL]: sablierMerkleLLAbi,
  [manifest.SABLIER_MERKLE_LT]: sablierMerkleLTAbi,
  [manifest.SABLIER_MERKLE_VCA]: sablierMerkleVCAAbi,
} as const;
