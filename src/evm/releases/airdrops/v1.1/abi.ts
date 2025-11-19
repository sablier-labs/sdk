import { sablierV2MerkleStreamerAbi } from "./abi/SablierV2MerkleStreamer";
import { sablierV2MerkleStreamerFactoryAbi } from "./abi/SablierV2MerkleStreamerFactory";
import { sablierV2MerkleStreamerLLAbi } from "./abi/SablierV2MerkleStreamerLL";
import manifest from "./manifest";

export const abi = {
  [manifest.SABLIER_V2_MERKLE_STREAMER]: sablierV2MerkleStreamerAbi,
  [manifest.SABLIER_V2_MERKLE_STREAMER_FACTORY]: sablierV2MerkleStreamerFactoryAbi,
  [manifest.SABLIER_V2_MERKLE_STREAMER_LL]: sablierV2MerkleStreamerLLAbi,
} as const;
