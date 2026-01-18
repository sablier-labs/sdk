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

export const comptroller = {
  abi,
  deployments,
  manifest,
};
