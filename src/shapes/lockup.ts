import { Shape } from "./enums";
import type { LockupShapeDefinition, LockupShapesRecord } from "./types";

const backweighted = {
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
  id: Shape.Lockup.Backweighted,
  name: "Backweighted",
} satisfies LockupShapeDefinition;

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

const doubleUnlock = {
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
  id: Shape.Lockup.DoubleUnlock,
  name: "Double Unlock",
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

const monthly = {
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
  id: Shape.Lockup.Monthly,
  name: "Monthly",
} satisfies LockupShapeDefinition;

const stepper = {
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
  id: Shape.Lockup.Stepper,
  name: "Stepper",
} satisfies LockupShapeDefinition;

const timelock = {
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
  id: Shape.Lockup.Timelock,
  name: "Timelock",
} satisfies LockupShapeDefinition;

const unlockCliff = {
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
  id: Shape.Lockup.UnlockCliff,
  name: "Unlock Cliff",
  solana: [
    {
      createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
      program: "SablierLockupLinear",
      version: "v0.1",
    },
  ],
} satisfies LockupShapeDefinition;

const unlockLinear = {
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
  id: Shape.Lockup.UnlockLinear,
  name: "Unlock Linear",
  solana: [
    {
      createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
      program: "SablierLockupLinear",
      version: "v0.1",
    },
  ],
} satisfies LockupShapeDefinition;

export const lockupShapes = {
  backweighted,
  cliff,
  doubleUnlock,
  dynamicCliffExponential,
  dynamicExponential,
  linear,
  monthly,
  stepper,
  timelock,
  unlockCliff,
  unlockLinear,
} satisfies LockupShapesRecord;
