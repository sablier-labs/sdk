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

const dynamicDoubleCliff = {
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
  id: Shape.Lockup.DynamicDoubleCliff,
  name: "Dynamic Double Cliff",
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
  [Shape.Lockup.DynamicDoubleCliff]: dynamicDoubleCliff,
  [Shape.Lockup.DynamicCliffExponential]: dynamicCliffExponential,
  [Shape.Lockup.DynamicExponential]: dynamicExponential,
  [Shape.Lockup.Linear]: linear,
  [Shape.Lockup.TranchedMonthly]: tranchedMonthly,
  [Shape.Lockup.TranchedStepper]: tranchedStepper,
  [Shape.Lockup.TranchedTimelock]: tranchedTimelock,
  [Shape.Lockup.LinearUnlockCliff]: linearUnlockCliff,
  [Shape.Lockup.LinearUnlockLinear]: linearUnlockLinear,
} satisfies LockupShapesRecord;
