import { Shape } from "./enums";
import type { LockupShapeDefinition, LockupShapesRecord } from "./types";

// NOTE: Shape definitions are sorted alphabetically. Please maintain this order when adding new shapes.

const cliff = {
  evm: [
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
  name: "Cliff",
  solana: [
    {
      createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
      program: "SablierLockupLinear",
      version: "v0.1",
    },
  ],
} satisfies LockupShapeDefinition;

const dynamicCliffExponential = {
  evm: [
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
  name: "Dynamic Cliff Exponential",
} satisfies LockupShapeDefinition;

const dynamicDoubleUnlock = {
  evm: [
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
  id: Shape.Lockup.DynamicDoubleUnlock,
  name: "Dynamic Double Unlock",
} satisfies LockupShapeDefinition;

const dynamicExponential = {
  evm: [
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
  name: "Dynamic Exponential",
} satisfies LockupShapeDefinition;

/**
 * Timelocks used to be created with LockupDynamic (from 2023 through early 2024). Then, when we shipped LockupTranched
 * in July 2024, we started using LockupTranched for timelocks.
 * @see https://github.com/sablier-labs/lockup/blob/main/CHANGELOG.md
 */
const dynamicTimelock = {
  evm: [
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
  id: Shape.Lockup.DynamicTimelock,
  name: "Dynamic Timelock",
} satisfies LockupShapeDefinition;

const dynamicMonthly = {
  evm: [
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
  id: Shape.Lockup.DynamicMonthly,
  name: "Dynamic Monthly",
} satisfies LockupShapeDefinition;

const dynamicStepper = {
  evm: [
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
  id: Shape.Lockup.DynamicStepper,
  name: "Dynamic Stepper",
} satisfies LockupShapeDefinition;

const dynamicUnlockCliff = {
  evm: [
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
  id: Shape.Lockup.DynamicUnlockCliff,
  name: "Dynamic Unlock Cliff",
} satisfies LockupShapeDefinition;

const dynamicUnlockLinear = {
  evm: [
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
  id: Shape.Lockup.DynamicUnlockLinear,
  name: "Dynamic Unlock Linear",
} satisfies LockupShapeDefinition;

const linear = {
  evm: [
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
  name: "Linear",
  solana: [
    {
      createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
      program: "SablierLockupLinear",
      version: "v0.1",
    },
  ],
} satisfies LockupShapeDefinition;

const linearTimelock = {
  evm: [
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
  id: Shape.Lockup.LinearTimelock,
  name: "Linear Timelock",
  solana: [
    {
      createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
      program: "SablierLockupLinear",
      version: "v0.1",
    },
  ],
} satisfies LockupShapeDefinition;

const linearUnlockCliff = {
  evm: [
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
  id: Shape.Lockup.LinearUnlockCliff,
  name: "Linear Unlock Cliff",
  solana: [
    {
      createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
      program: "SablierLockupLinear",
      version: "v0.1",
    },
  ],
} satisfies LockupShapeDefinition;

const linearUnlockLinear = {
  evm: [
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
  id: Shape.Lockup.LinearUnlockLinear,
  name: "Linear Unlock Linear",
  solana: [
    {
      createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
      program: "SablierLockupLinear",
      version: "v0.1",
    },
  ],
} satisfies LockupShapeDefinition;

const tranchedBackweighted = {
  evm: [
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
  id: Shape.Lockup.TranchedBackweighted,
  name: "Tranched Backweighted",
} satisfies LockupShapeDefinition;

const tranchedMonthly = {
  evm: [
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
  id: Shape.Lockup.TranchedMonthly,
  name: "Tranched Monthly",
} satisfies LockupShapeDefinition;

const tranchedStepper = {
  evm: [
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
  id: Shape.Lockup.TranchedStepper,
  name: "Tranched Stepper",
} satisfies LockupShapeDefinition;

const tranchedTimelock = {
  evm: [
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
  id: Shape.Lockup.TranchedTimelock,
  name: "Tranched Timelock",
} satisfies LockupShapeDefinition;

export const lockupShapes = {
  [Shape.Lockup.TranchedBackweighted]: tranchedBackweighted,
  [Shape.Lockup.Cliff]: cliff,
  [Shape.Lockup.DynamicDoubleUnlock]: dynamicDoubleUnlock,
  [Shape.Lockup.DynamicCliffExponential]: dynamicCliffExponential,
  [Shape.Lockup.DynamicExponential]: dynamicExponential,
  [Shape.Lockup.DynamicTimelock]: dynamicTimelock,
  [Shape.Lockup.DynamicMonthly]: dynamicMonthly,
  [Shape.Lockup.DynamicStepper]: dynamicStepper,
  [Shape.Lockup.DynamicUnlockCliff]: dynamicUnlockCliff,
  [Shape.Lockup.DynamicUnlockLinear]: dynamicUnlockLinear,
  [Shape.Lockup.Linear]: linear,
  [Shape.Lockup.TranchedMonthly]: tranchedMonthly,
  [Shape.Lockup.TranchedStepper]: tranchedStepper,
  [Shape.Lockup.TranchedTimelock]: tranchedTimelock,
  [Shape.Lockup.LinearUnlockCliff]: linearUnlockCliff,
  [Shape.Lockup.LinearUnlockLinear]: linearUnlockLinear,
  [Shape.Lockup.LinearTimelock]: linearTimelock,
} satisfies LockupShapesRecord;
