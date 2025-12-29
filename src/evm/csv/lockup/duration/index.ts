import type { BaseColumns } from "../../types";

/** Tranched backweighted with start: address, amount, start, years, unlocks */
export type TranchedBackweightedColumns = BaseColumns & {
  /** Start timestamp */
  start: string;
  /** Number of years */
  years: string;
  /** Unlock percentages (e.g., "10;20;30;40") */
  unlocks: string;
};

/** Linear vesting with duration: address, amount, duration */
export type LinearColumns = BaseColumns & {
  /** Relative duration (e.g., "2 years 20 days") */
  duration: string;
};

/** Cliff vesting with duration: address, amount, duration, cliffDuration, cliffAmount */
export type CliffColumns = LinearColumns & {
  /** Cliff duration (e.g., "1 years 45 days 6 hours") */
  cliffDuration: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/**
 * Dynamic cliff-exponential with duration: address, amount, duration, cliffDuration, cliffAmount
 * @note Structurally identical to CliffColumns; the shape difference is semantic only
 */
export type DynamicCliffExponentialColumns = CliffColumns;

/** Dynamic double-unlock with duration: address, amount, duration, firstUnlockDuration, firstUnlockAmount, secondUnlockDuration, secondUnlockAmount */
export type DynamicDoubleUnlockColumns = LinearColumns & {
  /** Duration until first unlock */
  firstUnlockDuration: string;
  /** Amount for first unlock */
  firstUnlockAmount: string;
  /** Duration until second unlock */
  secondUnlockDuration: string;
  /** Amount for second unlock */
  secondUnlockAmount: string;
};

/**
 * Dynamic exponential vesting with duration: address, amount, duration
 * @note Structurally identical to LinearColumns; the shape difference is semantic only
 */
export type DynamicExponentialColumns = LinearColumns;

/** Tranched monthly with start: address, amount, start, months, initial */
export type TranchedMonthlyColumns = BaseColumns & {
  /** Start timestamp (e.g., "2026-01-12 16:15") */
  start: string;
  /** Number of months */
  months: string;
  /** Initial unlock timing ("at start" or similar) */
  initial: string;
};

/** Tranched stepper with duration: address, amount, duration, steps */
export type TranchedStepperColumns = LinearColumns & {
  /** Number of discrete unlock steps */
  steps: string;
};

/**
 * Tranched timelock with duration: address, amount, duration
 * @note Structurally identical to LinearColumns; the shape difference is semantic only
 */
export type TranchedTimelockColumns = LinearColumns;

/** Linear unlock-cliff with duration: address, amount, duration, cliffDuration, unlock, cliffAmount */
export type LinearUnlockCliffColumns = LinearColumns & {
  /** Cliff duration */
  cliffDuration: string;
  /** Immediate unlock percentage */
  unlock: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/** Linear unlock-linear with duration: address, amount, duration, unlock */
export type LinearUnlockLinearColumns = LinearColumns & {
  /** Immediate unlock percentage */
  unlock: string;
};

/** All duration template column types */
export type Columns =
  | TranchedBackweightedColumns
  | CliffColumns
  | DynamicDoubleUnlockColumns
  | DynamicCliffExponentialColumns
  | DynamicExponentialColumns
  | LinearColumns
  | TranchedMonthlyColumns
  | TranchedStepperColumns
  | TranchedTimelockColumns
  | LinearUnlockCliffColumns
  | LinearUnlockLinearColumns;
