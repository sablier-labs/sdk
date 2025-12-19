import { Protocol } from "../enums";
import { Shape } from "./enums";
import type { LockupShapeDefinition, LockupShapesRecord } from "./types";

/** Linear vesting with no cliff */
export const linear: LockupShapeDefinition<Shape.Lockup.Linear> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.Linear,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Linear vesting with a cliff period. Uses same contract methods as linear shape - cliff duration is specified in parameters. */
export const cliff: LockupShapeDefinition<Shape.Lockup.Cliff> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.Cliff,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Instant unlock followed by linear vesting. Uses same contract methods as linear shape - unlock amount is specified in parameters. */
export const unlockLinear: LockupShapeDefinition<Shape.Lockup.UnlockLinear> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.UnlockLinear,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Instant unlock followed by cliff then linear vesting. Uses same contract methods as linear shape - unlock amount and cliff are specified in parameters. */
export const unlockCliff: LockupShapeDefinition<Shape.Lockup.UnlockCliff> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLL", "createWithTimestampsLL"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupLinear",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.UnlockCliff,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Exponential curve vesting */
export const exponential: LockupShapeDefinition<Shape.Lockup.Exponential> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.Exponential,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Exponential curve vesting with cliff period. Uses same contract methods as exponential shape - cliff is specified in parameters. */
export const cliffExponential: LockupShapeDefinition<Shape.Lockup.CliffExponential> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.CliffExponential,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Backweighted vesting curve. Uses same contract methods as exponential shape - curve parameters differ. */
export const backweighted: LockupShapeDefinition<Shape.Lockup.Backweighted> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLD", "createWithTimestampsLD"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.1",
    },
    {
      contract: "SablierV2LockupDynamic",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.0",
    },
  ],
  id: Shape.Lockup.Backweighted,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Step-based vesting with discrete tranches */
export const stepper: LockupShapeDefinition<Shape.Lockup.Stepper> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.Stepper,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Monthly vesting with equal tranches. Uses same contract methods as stepper shape - tranche count and amounts are specified in parameters. */
export const monthly: LockupShapeDefinition<Shape.Lockup.Monthly> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.Monthly,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Timelock with single unlock at end. Uses same contract methods as stepper shape - single tranche at end time. */
export const timelock: LockupShapeDefinition<Shape.Lockup.Timelock> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.Timelock,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** Two-tranche unlock pattern. Uses same contract methods as stepper shape - two tranches with custom amounts and times. */
export const doubleUnlock: LockupShapeDefinition<Shape.Lockup.DoubleUnlock> = {
  contracts: [
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v3.0",
    },
    {
      contract: "SablierLockup",
      methods: ["createWithDurationsLT", "createWithTimestampsLT"],
      version: "v2.0",
    },
    {
      contract: "SablierV2LockupTranched",
      methods: ["createWithDurations", "createWithTimestamps"],
      version: "v1.2",
    },
  ],
  id: Shape.Lockup.DoubleUnlock,
  protocol: Protocol.Lockup,
} satisfies LockupShapeDefinition;

/** All Lockup shapes indexed by ID */
export const lockupShapes = {
  [Shape.Lockup.Linear]: linear,
  [Shape.Lockup.Cliff]: cliff,
  [Shape.Lockup.UnlockLinear]: unlockLinear,
  [Shape.Lockup.UnlockCliff]: unlockCliff,
  [Shape.Lockup.Exponential]: exponential,
  [Shape.Lockup.CliffExponential]: cliffExponential,
  [Shape.Lockup.Backweighted]: backweighted,
  [Shape.Lockup.Stepper]: stepper,
  [Shape.Lockup.Monthly]: monthly,
  [Shape.Lockup.Timelock]: timelock,
  [Shape.Lockup.DoubleUnlock]: doubleUnlock,
} as const satisfies LockupShapesRecord;
