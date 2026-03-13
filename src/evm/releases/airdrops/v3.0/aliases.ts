import manifest from "./manifest.js";

// MF = Merkle Factory
const aliases = {
  [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: "MF_EXEC",
  [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: "MF_INST",
  [manifest.SABLIER_FACTORY_MERKLE_LL]: "MF_LL",
  [manifest.SABLIER_FACTORY_MERKLE_LT]: "MF_LT",
  [manifest.SABLIER_FACTORY_MERKLE_VCA]: "MF_VCA",
};

export default aliases;
