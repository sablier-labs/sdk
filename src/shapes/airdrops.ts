import { Shape } from "./enums";
import type { AirdropShapeDefinition, AirdropShapesRecord } from "./types";

/**
 * Cliff airdrop shape
 * Creates vesting airdrops with an initial cliff period followed by linear vesting
 */
const cliff = {
  evm: [
    {
      contract: "SablierFactoryMerkleLL",
      createMethods: ["createMerkleLL"],
      version: "v2.0",
    },
    {
      contract: "SablierMerkleFactory",
      createMethods: ["createMerkleLL"],
      version: "v1.3",
    },
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
  name: "Cliff",
} satisfies AirdropShapeDefinition;

/**
 * Instant airdrop shape
 * Creates immediate airdrops with no vesting period
 * Supported on both EVM and Solana
 */
const instant = {
  evm: [
    {
      contract: "SablierFactoryMerkleInstant",
      createMethods: ["createMerkleInstant"],
      version: "v2.0",
    },
    {
      contract: "SablierMerkleFactory",
      createMethods: ["createMerkleInstant"],
      version: "v1.3",
    },
  ],
  id: Shape.Airdrops.Instant,
  name: "Instant",
  solana: [
    {
      createMethods: ["create_campaign"],
      program: "SablierMerkleInstant",
      version: "v0.1",
    },
  ],
} satisfies AirdropShapeDefinition;

/**
 * Linear airdrop shape
 * Creates airdrops with linear vesting from start to end
 */
const linear = {
  evm: [
    {
      contract: "SablierFactoryMerkleLL",
      createMethods: ["createMerkleLL"],
      version: "v2.0",
    },
    {
      contract: "SablierMerkleFactory",
      createMethods: ["createMerkleLL"],
      version: "v1.3",
    },
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
  name: "Linear",
} satisfies AirdropShapeDefinition;

/**
 * Stepper airdrop shape
 * Creates airdrops with step-based vesting (tranches)
 */
const stepper = {
  evm: [
    {
      contract: "SablierFactoryMerkleLT",
      createMethods: ["createMerkleLT"],
      version: "v2.0",
    },
    {
      contract: "SablierMerkleFactory",
      createMethods: ["createMerkleLT"],
      version: "v1.3",
    },
    {
      contract: "SablierV2MerkleLockupFactory",
      createMethods: ["createMerkleLT"],
      version: "v1.2",
    },
  ],
  id: Shape.Airdrops.Stepper,
  name: "Stepper",
} satisfies AirdropShapeDefinition;

/**
 * Unlock Cliff airdrop shape
 * Creates airdrops with an initial unlock followed by cliff vesting
 * Available only in v2.0+
 */
const unlockCliff = {
  evm: [
    {
      contract: "SablierFactoryMerkleLL",
      createMethods: ["createMerkleLL"],
      version: "v2.0",
    },
  ],
  id: Shape.Airdrops.UnlockCliff,
  name: "Unlock Cliff",
} satisfies AirdropShapeDefinition;

/**
 * Unlock Linear airdrop shape
 * Creates airdrops with an initial unlock followed by linear vesting
 * Available only in v2.0+
 */
const unlockLinear = {
  evm: [
    {
      contract: "SablierFactoryMerkleLL",
      createMethods: ["createMerkleLL"],
      version: "v2.0",
    },
  ],
  id: Shape.Airdrops.UnlockLinear,
  name: "Unlock Linear",
} satisfies AirdropShapeDefinition;

/**
 * All airdrop shapes with unified EVM and Solana support
 * Ordered alphabetically by shape ID
 */
export const airdropShapes = {
  [Shape.Airdrops.Cliff]: cliff,
  [Shape.Airdrops.Instant]: instant,
  [Shape.Airdrops.Linear]: linear,
  [Shape.Airdrops.Stepper]: stepper,
  [Shape.Airdrops.UnlockCliff]: unlockCliff,
  [Shape.Airdrops.UnlockLinear]: unlockLinear,
} satisfies AirdropShapesRecord;
