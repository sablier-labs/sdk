// NOTE: Shape definitions are sorted alphabetically. Please maintain this order when adding new shapes.

import { Protocol } from "../enums";
import { Shape } from "./enums";
import type { AirdropShapeDefinition, AirdropShapesRecord } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// CLIFF
// ─────────────────────────────────────────────────────────────────────────────

export const cliff: AirdropShapeDefinition<Shape.Airdrops.Cliff> = {
  contracts: [
    { contract: "SablierFactoryMerkleLL", createMethods: ["createMerkleLL"], version: "v2.0" },
    { contract: "SablierMerkleFactory", createMethods: ["createMerkleLL"], version: "v1.3" },
    {
      contract: "SablierV2MerkleLockupFactory",
      createMethods: ["createMerkleLL"],
      version: "v1.2",
    },
    {
      contract: "SablierV2MerkleStreamerFactory",
      createMethods: ["createMerkleStreamerLL"],
      version: "v1.1",
    },
  ],
  id: Shape.Airdrops.Cliff,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// INSTANT
// ─────────────────────────────────────────────────────────────────────────────

export const instant: AirdropShapeDefinition<Shape.Airdrops.Instant> = {
  contracts: [
    {
      contract: "SablierFactoryMerkleInstant",
      createMethods: ["createMerkleInstant"],
      version: "v2.0",
    },
    { contract: "SablierMerkleFactory", createMethods: ["createMerkleInstant"], version: "v1.3" },
  ],
  id: Shape.Airdrops.Instant,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// LINEAR
// ─────────────────────────────────────────────────────────────────────────────

export const linear: AirdropShapeDefinition<Shape.Airdrops.Linear> = {
  contracts: [
    { contract: "SablierFactoryMerkleLL", createMethods: ["createMerkleLL"], version: "v2.0" },
    { contract: "SablierMerkleFactory", createMethods: ["createMerkleLL"], version: "v1.3" },
    {
      contract: "SablierV2MerkleLockupFactory",
      createMethods: ["createMerkleLL"],
      version: "v1.2",
    },
    {
      contract: "SablierV2MerkleStreamerFactory",
      createMethods: ["createMerkleStreamerLL"],
      version: "v1.1",
    },
  ],
  id: Shape.Airdrops.Linear,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// STEPPER
// ─────────────────────────────────────────────────────────────────────────────

export const stepper: AirdropShapeDefinition<Shape.Airdrops.Stepper> = {
  contracts: [
    { contract: "SablierFactoryMerkleLT", createMethods: ["createMerkleLT"], version: "v2.0" },
    { contract: "SablierMerkleFactory", createMethods: ["createMerkleLT"], version: "v1.3" },
    {
      contract: "SablierV2MerkleLockupFactory",
      createMethods: ["createMerkleLT"],
      version: "v1.2",
    },
  ],
  id: Shape.Airdrops.Stepper,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// UNLOCK CLIFF
// ─────────────────────────────────────────────────────────────────────────────

/** Only supported in v2.0+ (requires Lockup v2.0+ unlock params). */
export const unlockCliff: AirdropShapeDefinition<Shape.Airdrops.UnlockCliff> = {
  contracts: [
    { contract: "SablierFactoryMerkleLL", createMethods: ["createMerkleLL"], version: "v2.0" },
  ],
  id: Shape.Airdrops.UnlockCliff,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// UNLOCK LINEAR
// ─────────────────────────────────────────────────────────────────────────────

/** Only supported in v2.0+ (requires Lockup v2.0+ unlock params). */
export const unlockLinear: AirdropShapeDefinition<Shape.Airdrops.UnlockLinear> = {
  contracts: [
    { contract: "SablierFactoryMerkleLL", createMethods: ["createMerkleLL"], version: "v2.0" },
  ],
  id: Shape.Airdrops.UnlockLinear,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// ALL AIRDROP SHAPES
// ─────────────────────────────────────────────────────────────────────────────

/** All Airdrop shapes indexed by ID */
export const airdropShapes = {
  [Shape.Airdrops.Cliff]: cliff,
  [Shape.Airdrops.Instant]: instant,
  [Shape.Airdrops.Linear]: linear,
  [Shape.Airdrops.Stepper]: stepper,
  [Shape.Airdrops.UnlockCliff]: unlockCliff,
  [Shape.Airdrops.UnlockLinear]: unlockLinear,
} as const satisfies AirdropShapesRecord;
