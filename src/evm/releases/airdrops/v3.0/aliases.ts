import manifest from "./manifest.js";

// MF = Merkle Factory
const aliases = {
  [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: "MF2_EXEC",
  [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: "MF2_INST",
  [manifest.SABLIER_FACTORY_MERKLE_LL]: "MF2_LL",
  [manifest.SABLIER_FACTORY_MERKLE_LT]: "MF2_LT",
  [manifest.SABLIER_FACTORY_MERKLE_VCA]: "MF2_VCA",
};

export default aliases;
