/**
 * The Comptroller contract is not part of the standard releases module because:
 *
 * - It's a special governance contract that sits behind an upgradeable proxy.
 * - It doesn't belong to any particular protocol.
 *
 * @see https://docs.sablier.com/concepts/governance
 */

import { abi } from "./abi";
import { deployments } from "./deployments";
import manifest from "./manifest";

export const comptroller = {
  abi,
  deployments,
  manifest,
};
