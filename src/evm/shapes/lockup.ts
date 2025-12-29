// NOTE: Shape definitions are sorted alphabetically. Please maintain this order when adding new shapes.

import { Protocol } from "../enums";
import { Shape } from "./enums";
import type { LockupShapeDefinition, LockupShapesRecord } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// BACKWEIGHTED
// ─────────────────────────────────────────────────────────────────────────────

/** Backweighted vesting curve. Uses same contract methods as dynamicExponential shape - curve parameters differ. */
export const backweighted: LockupShapeDefinition<Shape.Lockup.Backweighted> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupDynamic",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupDynamic",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupDynamic",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.Backweighted,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// CLIFF
// ─────────────────────────────────────────────────────────────────────────────

/** Linear vesting with a cliff period. Uses same contract methods as linear shape - cliff duration is specified in parameters. */
export const cliff: LockupShapeDefinition<Shape.Lockup.Cliff> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupLinear",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupLinear",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupLinear",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.Cliff,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// DOUBLE UNLOCK
// ─────────────────────────────────────────────────────────────────────────────

/** Two-tranche unlock pattern. Uses same contract methods as stepper shape - two tranches with custom amounts and times. */
export const doubleUnlock: LockupShapeDefinition<Shape.Lockup.DoubleUnlock> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.DoubleUnlock,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC CLIFF EXPONENTIAL
// ─────────────────────────────────────────────────────────────────────────────

/** Exponential curve vesting with cliff period. Uses same contract methods as dynamicExponential shape - cliff is specified in parameters. */
export const dynamicCliffExponential: LockupShapeDefinition<Shape.Lockup.DynamicCliffExponential> =
  {
    contracts: [
      {
        contract: "SablierLockup",
        createMethods: ["createWithDurationsLD", "createWithTimestampsLD"],
        version: "v3.0",
      },
      {
        contract: "SablierLockup",
        createMethods: ["createWithDurationsLD", "createWithTimestampsLD"],
        version: "v2.0",
      },
      {
        contract: "SablierV2LockupDynamic",
        createMethods: ["createWithDurations", "createWithTimestamps"],
        version: "v1.2",
      },
      {
        contract: "SablierV2LockupDynamic",
        createMethods: ["createWithDurations", "createWithTimestamps"],
        version: "v1.1",
      },
      {
        contract: "SablierV2LockupDynamic",
        createMethods: ["createWithDurations", "createWithTimestamps"],
        version: "v1.0",
      },
    ],
    id: Shape.Lockup.DynamicCliffExponential,
    protocol: Protocol.Lockup,
  } satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC EXPONENTIAL
// ─────────────────────────────────────────────────────────────────────────────

/** Exponential curve vesting */
export const dynamicExponential: LockupShapeDefinition<Shape.Lockup.DynamicExponential> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupDynamic",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupDynamic",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupDynamic",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.DynamicExponential,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// LINEAR
// ─────────────────────────────────────────────────────────────────────────────

/** Linear vesting with no cliff */
export const linear: LockupShapeDefinition<Shape.Lockup.Linear> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupLinear",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupLinear",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupLinear",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.Linear,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// MONTHLY
// ─────────────────────────────────────────────────────────────────────────────

/** Monthly vesting with equal tranches. Uses same contract methods as stepper shape - tranche count and amounts are specified in parameters. */
export const monthly: LockupShapeDefinition<Shape.Lockup.Monthly> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.Monthly,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// STEPPER
// ─────────────────────────────────────────────────────────────────────────────

/** Step-based vesting with discrete tranches */
export const stepper: LockupShapeDefinition<Shape.Lockup.Stepper> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.Stepper,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// TIMELOCK
// ─────────────────────────────────────────────────────────────────────────────

/** Timelock with single unlock at end. Uses same contract methods as stepper shape - single tranche at end time. */
export const timelock: LockupShapeDefinition<Shape.Lockup.Timelock> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      createMethods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.Timelock,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// UNLOCK CLIFF
// ─────────────────────────────────────────────────────────────────────────────

/** Instant unlock followed by cliff then linear vesting. Uses same contract methods as linear shape - unlock amount and cliff are specified in parameters. Only supported in v2.0+. */
export const unlockCliff: LockupShapeDefinition<Shape.Lockup.UnlockCliff> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
  ],
  id: Shape.Lockup.UnlockCliff,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// UNLOCK LINEAR
// ─────────────────────────────────────────────────────────────────────────────

/** Instant unlock followed by linear vesting. Uses same contract methods as linear shape - unlock amount is specified in parameters. Only supported in v2.0+. */
export const unlockLinear: LockupShapeDefinition<Shape.Lockup.UnlockLinear> = {
  contracts: [
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      createMethods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
  ],
  id: Shape.Lockup.UnlockLinear,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

// ─────────────────────────────────────────────────────────────────────────────
// ALL LOCKUP SHAPES
// ─────────────────────────────────────────────────────────────────────────────

/** All Lockup shapes indexed by ID */
export const lockupShapes = {
  [Shape.Lockup.Backweighted]: backweighted,
  [Shape.Lockup.Cliff]: cliff,
  [Shape.Lockup.DoubleUnlock]: doubleUnlock,
  [Shape.Lockup.DynamicCliffExponential]: dynamicCliffExponential,
  [Shape.Lockup.DynamicExponential]: dynamicExponential,
  [Shape.Lockup.Linear]: linear,
  [Shape.Lockup.Monthly]: monthly,
  [Shape.Lockup.Stepper]: stepper,
  [Shape.Lockup.Timelock]: timelock,
  [Shape.Lockup.UnlockCliff]: unlockCliff,
  [Shape.Lockup.UnlockLinear]: unlockLinear,
} as const satisfies LockupShapesRecord;
