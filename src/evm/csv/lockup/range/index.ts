import type { BaseColumns } from "../../types";

/** Tranched backweighted: address, amount, startAt, unlockPercentages, yearCount */
export type TranchedBackweightedColumns = BaseColumns & {
  /** Start timestamp */
  /** Number of years */
  startAt: string;
  /** Unlock percentages (e.g., "10;20;30;40") */
  unlockPercentages: string;
  /** Number of years */
  yearCount: string;
};

/** Linear vesting with range: address, amount, startAt, endAt */
export type LinearColumns = BaseColumns & {
  /** Start timestamp (e.g., "2024-01-12 16:15") */
  startAt: string;
  /** End timestamp */
  endAt: string;
};

/** Cliff with range: address, amount, startAt, endAt, cliffAmount, cliffAt */
export type CliffColumns = LinearColumns & {
  /** Amount unlocked at cliff */
  cliffAmount: string;
  /** Cliff timestamp */
  cliffAt: string;
};

/**
 * Dynamic cliff-exponential with range: address, amount, startAt, endAt, cliffAmount, cliffAt
 * @note Structurally identical to CliffColumns; the shape difference is semantic only
 */
export type DynamicCliffExponentialColumns = CliffColumns;

/** Dynamic double-unlock with range: address, amount, startAt, endAt, firstUnlockAmount, firstUnlockAt, secondUnlockAmount, secondUnlockAt */
export type DynamicDoubleUnlockColumns = LinearColumns & {
  /** Amount for first unlock */
  firstUnlockAmount: string;
  /** First unlock timestamp */
  firstUnlockAt: string;
  /** Amount for second unlock */
  secondUnlockAmount: string;
  /** Second unlock timestamp */
  secondUnlockAt: string;
};

/**
 * Dynamic exponential with range: address, amount, startAt, endAt
 * @note Structurally identical to LinearColumns; the shape difference is semantic only
 */
export type DynamicExponentialColumns = LinearColumns;

/** Tranched monthly: address, amount, startAt, monthCount */
export type TranchedMonthlyColumns = BaseColumns & {
  /** Start timestamp (e.g., "2026-01-12 16:15") */
  startAt: string;
  /** Number of months */
  monthCount: string;
};

/** Tranched stepper with range: address, amount, startAt, endAt, stepCount */
export type TranchedStepperColumns = LinearColumns & {
  /** Number of discrete unlock steps */
  stepCount: string;
};

/** Tranched timelock with range: address, amount, endAt */
export type TranchedTimelockColumns = BaseColumns & {
  /** End timestamp when tokens unlock */
  endAt: string;
};

/** Linear unlock-cliff with range: address, amount, startAt, endAt, unlockAmount, cliffAmount, cliffAt */
export type LinearUnlockCliffColumns = LinearColumns & {
  /** Immediate unlock amount */
  unlockAmount: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
  /** Cliff timestamp */
  cliffAt: string;
};

/** Linear unlock-linear with range: address, amount, startAt, endAt, unlockAmount */
export type LinearUnlockLinearColumns = LinearColumns & {
  /** Immediate unlock amount */
  unlockAmount: string;
};

/** All range template column types */
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
