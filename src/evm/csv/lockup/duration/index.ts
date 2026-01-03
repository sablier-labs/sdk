import type { BaseColumns } from "../../types";

/** Linear vesting with duration: address, amount, duration */
export type LinearColumns = BaseColumns & {
  /** Relative duration (e.g., "2 years 20 days") */
  duration: string;
};

/** Cliff vesting with duration: address, amount, duration, cliffAmount, cliffDuration */
export type CliffColumns = LinearColumns & {
  /** Amount unlocked at cliff */
  cliffAmount: string;
  /** Cliff duration (e.g., "1 years 45 days 6 hours") */
  cliffDuration: string;
};

/**
 * Dynamic cliff-exponential with duration: address, amount, duration, cliffAmount, cliffDuration
 * @note Structurally identical to CliffColumns; the shape difference is semantic only
 */
export type DynamicCliffExponentialColumns = CliffColumns;

/** Dynamic double-unlock with duration: address, amount, duration, firstUnlockAmount, firstUnlockDuration, secondUnlockAmount, secondUnlockDuration */
export type DynamicDoubleUnlockColumns = LinearColumns & {
  /** Amount for first unlock */
  firstUnlockAmount: string;
  /** Duration until first unlock */
  firstUnlockDuration: string;
  /** Amount for second unlock */
  secondUnlockAmount: string;
  /** Duration until second unlock */
  secondUnlockDuration: string;
};

/**
 * Dynamic exponential vesting with duration: address, amount, duration
 * @note Structurally identical to LinearColumns; the shape difference is semantic only
 */
export type DynamicExponentialColumns = LinearColumns;

/** Tranched stepper with duration: address, amount, duration, stepCount */
export type TranchedStepperColumns = LinearColumns & {
  /** Number of discrete unlock steps */
  stepCount: string;
};

/**
 * Tranched timelock with duration: address, amount, duration
 * @note Structurally identical to LinearColumns; the shape difference is semantic only
 */
export type TranchedTimelockColumns = LinearColumns;

/** Linear unlock-cliff with duration: address, amount, duration, unlockAmount, cliffAmount, cliffDuration */
export type LinearUnlockCliffColumns = LinearColumns & {
  /** Immediate unlock amount */
  unlockAmount: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
  /** Cliff duration */
  cliffDuration: string;
};

/** Linear unlock-linear with duration: address, amount, duration, unlockAmount */
export type LinearUnlockLinearColumns = LinearColumns & {
  /** Immediate unlock amount */
  unlockAmount: string;
};

/** All duration template column types */
export type Columns =
  | CliffColumns
  | DynamicDoubleUnlockColumns
  | DynamicCliffExponentialColumns
  | DynamicExponentialColumns
  | LinearColumns
  | TranchedStepperColumns
  | TranchedTimelockColumns
  | LinearUnlockCliffColumns
  | LinearUnlockLinearColumns;
