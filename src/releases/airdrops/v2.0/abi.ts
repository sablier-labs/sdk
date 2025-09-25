import { sablierFactoryMerkleInstantAbi } from "./abi/SablierFactoryMerkleInstant";
import { sablierFactoryMerkleLLAbi } from "./abi/SablierFactoryMerkleLL";
import { sablierFactoryMerkleLTAbi } from "./abi/SablierFactoryMerkleLT";
import { sablierFactoryMerkleVCAAbi } from "./abi/SablierFactoryMerkleVCA";
import { sablierMerkleInstantAbi } from "./abi/SablierMerkleInstant";
import { sablierMerkleLLAbi } from "./abi/SablierMerkleLL";
import { sablierMerkleLockupAbi } from "./abi/SablierMerkleLockup";
import { sablierMerkleLTAbi } from "./abi/SablierMerkleLT";
import { sablierMerkleVCAAbi } from "./abi/SablierMerkleVCA";
import manifest from "./manifest";

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
};
