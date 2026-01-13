import { sablierV2MerkleStreamerAbi } from "./abi/SablierV2MerkleStreamer.js";
import { sablierV2MerkleStreamerFactoryAbi } from "./abi/SablierV2MerkleStreamerFactory.js";
import { sablierV2MerkleStreamerLLAbi } from "./abi/SablierV2MerkleStreamerLL.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_V2_MERKLE_STREAMER]: sablierV2MerkleStreamerAbi,
  [manifest.SABLIER_V2_MERKLE_STREAMER_FACTORY]: sablierV2MerkleStreamerFactoryAbi,
  [manifest.SABLIER_V2_MERKLE_STREAMER_LL]: sablierV2MerkleStreamerLLAbi,
} as const;
