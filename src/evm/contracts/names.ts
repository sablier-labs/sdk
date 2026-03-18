import comptrollerV1_0 from "@/src/evm/comptroller/v1.0/manifest.js";
import comptrollerV2_0 from "@/src/evm/comptroller/v2.0/manifest.js";
import airdropsV1_1 from "@/src/evm/releases/airdrops/v1.1/manifest.js";
import airdropsV1_2 from "@/src/evm/releases/airdrops/v1.2/manifest.js";
import airdropsV1_3 from "@/src/evm/releases/airdrops/v1.3/manifest.js";
import airdropsV2_0 from "@/src/evm/releases/airdrops/v2.0/manifest.js";
import airdropsV3_0 from "@/src/evm/releases/airdrops/v3.0/manifest.js";
import bobV1_0 from "@/src/evm/releases/bob/v1.0/manifest.js";
import flowV1_0 from "@/src/evm/releases/flow/v1.0/manifest.js";
import flowV1_1 from "@/src/evm/releases/flow/v1.1/manifest.js";
import flowV2_0 from "@/src/evm/releases/flow/v2.0/manifest.js";
import flowV3_0 from "@/src/evm/releases/flow/v3.0/manifest.js";
import legacyV1_0 from "@/src/evm/releases/legacy/v1.0/manifest.js";
import legacyV1_1 from "@/src/evm/releases/legacy/v1.1/manifest.js";
import lockupV1_0 from "@/src/evm/releases/lockup/v1.0/manifest.js";
import lockupV1_1 from "@/src/evm/releases/lockup/v1.1/manifest.js";
import lockupV1_2 from "@/src/evm/releases/lockup/v1.2/manifest.js";
import lockupV2_0 from "@/src/evm/releases/lockup/v2.0/manifest.js";
import lockupV3_0 from "@/src/evm/releases/lockup/v3.0/manifest.js";
import lockupV4_0 from "@/src/evm/releases/lockup/v4.0/manifest.js";
import type { Sablier } from "@/src/types.js";

/**
 * Works at compile-time!
 */
type LeafKeys<T> = keyof T;

type A1_1 = LeafKeys<typeof airdropsV1_1>;
type A1_2 = LeafKeys<typeof airdropsV1_2>;
type A1_3 = LeafKeys<typeof airdropsV1_3>;
type A2_0 = LeafKeys<typeof airdropsV2_0>;

type B1_0 = LeafKeys<typeof bobV1_0>;

type C1_0 = LeafKeys<typeof comptrollerV1_0>;
type C2_0 = LeafKeys<typeof comptrollerV2_0>;

type F1_0 = LeafKeys<typeof flowV1_0>;
type F1_1 = LeafKeys<typeof flowV1_1>;
type F2_0 = LeafKeys<typeof flowV2_0>;

type LEGACY_1_0 = LeafKeys<typeof legacyV1_0>;
type LEGACY_1_1 = LeafKeys<typeof legacyV1_1>;

type L1_0 = LeafKeys<typeof lockupV1_0.core> | LeafKeys<typeof lockupV1_0.periphery>;
type L1_1 = LeafKeys<typeof lockupV1_1.core> | LeafKeys<typeof lockupV1_1.periphery>;
type L1_2 = LeafKeys<typeof lockupV1_2.core> | LeafKeys<typeof lockupV1_2.periphery>;
type L2_0 = LeafKeys<typeof lockupV2_0>;
type L3_0 = LeafKeys<typeof lockupV3_0>;

// Final exported type: only these known keys allowed
type ContractNames = Record<
  /** Airdrops */
  | A1_1
  | A1_2
  | A1_3
  | A2_0

  /** Bob */
  | B1_0

  /** Comptroller */
  | C1_0
  | C2_0

  /** Flow */
  | F1_0
  | F1_1
  | F2_0

  /** Legacy */
  | LEGACY_1_0
  | LEGACY_1_1

  /** Lockup */
  | L1_0
  | L1_1
  | L1_2
  | L2_0
  | L3_0,
  /** Other */
  string
>;

function flatten(manifest: Sablier.EVM.Manifest): Record<string, string> {
  if ("core" in manifest && "periphery" in manifest) {
    const lockupManifest = manifest as Sablier.EVM.Manifest.LockupV1;
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
    airdropsV2_0,
    airdropsV3_0,
    bobV1_0,
    comptrollerV1_0,
    comptrollerV2_0,
    flowV1_0,
    flowV1_1,
    flowV2_0,
    flowV3_0,
    legacyV1_0,
    legacyV1_1,
    lockupV1_0,
    lockupV1_1,
    lockupV1_2,
    lockupV2_0,
    lockupV3_0,
    lockupV4_0,
  ];

  const flattened = manifests.map(flatten);
  return Object.assign({}, ...flattened) as ContractNames;
}

export const names = getNames();
