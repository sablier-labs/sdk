import airdropsV1_1 from "@src/releases/airdrops/v1.1/manifest";
import airdropsV1_2 from "@src/releases/airdrops/v1.2/manifest";
import airdropsV1_3 from "@src/releases/airdrops/v1.3/manifest";
import airdropsV1_4 from "@src/releases/airdrops/v1.4/manifest";
import flowV1_0 from "@src/releases/flow/v1.0/manifest";
import flowV1_1 from "@src/releases/flow/v1.1/manifest";
import flowV1_2 from "@src/releases/flow/v1.2/manifest";
import legacyV1_0 from "@src/releases/legacy/v1.0/manifest";
import legacyV1_1 from "@src/releases/legacy/v1.1/manifest";
import lockupV1_0 from "@src/releases/lockup/v1.0/manifest";
import lockupV1_1 from "@src/releases/lockup/v1.1/manifest";
import lockupV1_2 from "@src/releases/lockup/v1.2/manifest";
import lockupV2_0 from "@src/releases/lockup/v2.0/manifest";
import lockupV2_1 from "@src/releases/lockup/v2.1/manifest";
import type { Sablier } from "@src/types";
import _ from "lodash";

/**
 * Works at compile-time!
 */
type LeafKeys<T> = keyof T;

type A1_1 = LeafKeys<typeof airdropsV1_1>;
type A1_2 = LeafKeys<typeof airdropsV1_2>;
type A1_3 = LeafKeys<typeof airdropsV1_3>;
type A1_4 = LeafKeys<typeof airdropsV1_4>;

type F1_0 = LeafKeys<typeof flowV1_0>;
type F1_1 = LeafKeys<typeof flowV1_1>;
type F1_2 = LeafKeys<typeof flowV1_2>;

type LEGACY_1_0 = LeafKeys<typeof legacyV1_0>;
type LEGACY_1_1 = LeafKeys<typeof legacyV1_1>;

type L1_0 = LeafKeys<typeof lockupV1_0.core> | LeafKeys<typeof lockupV1_0.periphery>;
type L1_1 = LeafKeys<typeof lockupV1_1.core> | LeafKeys<typeof lockupV1_1.periphery>;
type L1_2 = LeafKeys<typeof lockupV1_2.core> | LeafKeys<typeof lockupV1_2.periphery>;
type L2_0 = LeafKeys<typeof lockupV2_0>;
type L2_1 = LeafKeys<typeof lockupV2_1>;

// Final exported type: only these known keys allowed
type ContractNames = Record<
  A1_1 | A1_2 | A1_3 | A1_4 | F1_0 | F1_1 | F1_2 | LEGACY_1_0 | LEGACY_1_1 | L1_0 | L1_1 | L1_2 | L2_0 | L2_1,
  string
>;

function flatten(manifest: Sablier.Manifest): Record<string, string> {
  if ("core" in manifest && "periphery" in manifest) {
    const lockupManifest = manifest as Sablier.Manifest.LockupV1;
    return { ...lockupManifest.core, ...lockupManifest.periphery };
  }
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
  const manifests = [
    airdropsV1_1,
    airdropsV1_2,
    airdropsV1_3,
    airdropsV1_4,
    flowV1_0,
    flowV1_1,
    flowV1_2,
    legacyV1_0,
    legacyV1_1,
    lockupV1_0,
    lockupV1_1,
    lockupV1_2,
    lockupV2_0,
    lockupV2_1,
  ];

  const flattened = manifests.map(flatten);
  return _.merge({}, ...flattened) as ContractNames;
}

export const names = getNames();
