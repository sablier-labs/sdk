import { sablierMerkleBaseAbi } from "./abi/SablierMerkleBase";
import { sablierMerkleFactoryAbi } from "./abi/SablierMerkleFactory";
import { sablierMerkleInstantAbi } from "./abi/SablierMerkleInstant";
import { sablierMerkleLLAbi } from "./abi/SablierMerkleLL";
import { sablierMerkleLockupAbi } from "./abi/SablierMerkleLockup";
import { sablierMerkleLTAbi } from "./abi/SablierMerkleLT";
import manifest from "./manifest";

export const abi = {
  [manifest.SABLIER_MERKLE_BASE]: sablierMerkleBaseAbi,
  [manifest.SABLIER_MERKLE_FACTORY]: sablierMerkleFactoryAbi,
  [manifest.SABLIER_MERKLE_INSTANT]: sablierMerkleInstantAbi,
  [manifest.SABLIER_MERKLE_LOCKUP]: sablierMerkleLockupAbi,
  [manifest.SABLIER_MERKLE_LL]: sablierMerkleLLAbi,
  [manifest.SABLIER_MERKLE_LT]: sablierMerkleLTAbi,
} as const;
