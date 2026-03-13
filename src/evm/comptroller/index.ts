/**
 * The Comptroller contract is not part of the standard releases module because:
 *
 * - It's a special governance contract that sits behind an upgradeable proxy.
 * - It doesn't belong to any particular protocol.
 *
 * @see https://docs.sablier.com/concepts/governance
 */

import { abi } from "./abi.js";
import { deployments } from "./deployments.js";
import manifest from "./manifest.js";
import { abi as abiV1_0 } from "./v1.0/abi.js";
import manifestV1_0 from "./v1.0/manifest.js";
import { abi as abiV1_1 } from "./v1.1/abi.js";
import manifestV1_1 from "./v1.1/manifest.js";

export const comptroller = {
  abi,
  deployments,
  manifest,
  versions: {
    "v1.0": { abi: abiV1_0, manifest: manifestV1_0 },
    "v1.1": { abi: abiV1_1, manifest: manifestV1_1 },
  },
};
