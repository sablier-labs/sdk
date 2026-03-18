/**
 * The Comptroller contract is not part of the standard releases module because:
 *
 * - It's a special governance contract that sits behind an upgradeable proxy.
 * - It doesn't belong to any particular protocol.
 *
 * @see https://docs.sablier.com/concepts/governance
 */

import { deployments } from "./deployments.js";
import { release as releaseV1_0 } from "./v1.0/index.js";
import { release as releaseV2_0 } from "./v2.0/index.js";

export const comptroller = {
  deployments,
  releases: {
    "v1.0": releaseV1_0,
    "v2.0": releaseV2_0,
  },
};
