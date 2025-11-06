import airdropsV1_0 from "@src/solana/releases/airdrops/v0.1/manifest";
import lockupV1_0 from "@src/solana/releases/lockup/v0.1/manifest";
import type { Sablier } from "@src/types";
import _ from "lodash";

/**
 * Works at compile-time!
 */
type LeafKeys<T> = keyof T;

type A1_0 = LeafKeys<typeof airdropsV1_0>;
type L1_0 = LeafKeys<typeof lockupV1_0>;

// Final exported type: only these known keys allowed
type ContractNames = Record<A1_0 | L1_0, string>;

function flatten(manifest: Sablier.Solana.Manifest): Record<string, string> {
  return { ...manifest } as Record<string, string>;
}

/**
 * Flatten & merge across all releases
 * @example
 * ```ts
 * const lockupName = names.SABLIER_LOCKUP; // "SablierLockup"
 * const flowName = names.SABLIER_FLOW; //"SablierFlow"
 * ```
 */
function getNames(): ContractNames {
  const manifests = [airdropsV1_0, lockupV1_0];

  const flattened = manifests.map(flatten);
  return _.merge({}, ...flattened) as ContractNames;
}

export const names = getNames();
