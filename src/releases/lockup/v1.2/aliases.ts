import manifest from "./manifest";

const aliases = {
  [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: "LD3",
  [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: "LL3",
  [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: "LT3",
  [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: "MSF3", // MSF = Merkle Streamer Factory
};

export default aliases;
