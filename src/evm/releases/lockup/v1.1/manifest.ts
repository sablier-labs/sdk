const manifest = {
  core: {
    SABLIER_V2_COMPTROLLER: "SablierV2Comptroller",
    SABLIER_V2_LOCKUP: "SablierV2Lockup",
    SABLIER_V2_LOCKUP_DYNAMIC: "SablierV2LockupDynamic",
    SABLIER_V2_LOCKUP_LINEAR: "SablierV2LockupLinear",
    SABLIER_V2_NFT_DESCRIPTOR: "SablierV2NFTDescriptor",
  },
  periphery: {
    SABLIER_V2_BATCH: "SablierV2Batch",
    SABLIER_V2_MERKLE_STREAMER: "SablierV2MerkleStreamer",
    SABLIER_V2_MERKLE_STREAMER_FACTORY: "SablierV2MerkleStreamerFactory",
    SABLIER_V2_MERKLE_STREAMER_LL: "SablierV2MerkleStreamerLL",
  },
} as const;

export default manifest;
