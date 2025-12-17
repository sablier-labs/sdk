import type { BaseColumns } from "../../types";
import type {
  BackweightedColumns as DurationBackweightedColumns,
  MonthlyColumns as DurationMonthlyColumns,
} from "../duration/index";

/**
 * Backweighted with range: address, amount, start, years, unlocks
 * @note Identical to duration BackweightedColumns because backweighted vesting inherently uses
 * absolute timestamps (start date + number of years), not relative durations
 */
export type BackweightedColumns = DurationBackweightedColumns;

/** Linear vesting with range: address, amount, start, end */
export type LinearColumns = BaseColumns & {
  /** Start timestamp (e.g., "2024-01-12 16:15") */
  start: string;
  /** End timestamp */
  end: string;
};

/** Cliff with range: address, amount, start, end, cliffEnd, cliffAmount */
export type CliffColumns = LinearColumns & {
  /** Cliff end timestamp */
  cliffEnd: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/**
 * Cliff-exponential with range: address, amount, start, end, cliffEnd, cliffAmount
 * @note Structurally identical to CliffColumns; the shape difference is semantic only
 */
export type CliffExponentialColumns = CliffColumns;

/** Double-unlock with range: address, amount, start, end, firstUnlockEnd, firstUnlockAmount, secondUnlockEnd, secondUnlockAmount */
export type DoubleUnlockColumns = LinearColumns & {
  /** First unlock end timestamp */
  firstUnlockEnd: string;
  /** Amount for first unlock */
  firstUnlockAmount: string;
  /** Second unlock end timestamp */
  secondUnlockEnd: string;
  /** Amount for second unlock */
  secondUnlockAmount: string;
};

/**
 * Exponential with range: address, amount, start, end
 * @note Structurally identical to LinearColumns; the shape difference is semantic only
 */
export type ExponentialColumns = LinearColumns;

/**
 * Monthly with range: address, amount, start, months, initial
 * @note Identical to duration MonthlyColumns because monthly vesting inherently uses
 * absolute timestamps (start date + number of months), not relative durations
 */
export type MonthlyColumns = DurationMonthlyColumns;

/** Stepper with range: address, amount, start, end, steps */
export type StepperColumns = LinearColumns & {
  /** Number of discrete unlock steps */
  steps: string;
};

/** Timelock with range: address, amount, end */
export type TimelockColumns = BaseColumns & {
  /** End timestamp when tokens unlock */
  end: string;
};

/** Unlock-cliff with range: address, amount, start, end, cliffEnd, unlock, cliffAmount */
export type UnlockCliffColumns = LinearColumns & {
  /** Cliff end timestamp */
  cliffEnd: string;
  /** Immediate unlock percentage */
  unlock: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/** Unlock-linear with range: address, amount, start, end, unlock */
export type UnlockLinearColumns = LinearColumns & {
  /** Immediate unlock percentage */
  unlock: string;
};

/** All range template column types */
export type Columns =
  | BackweightedColumns
  | CliffColumns
  | CliffExponentialColumns
  | DoubleUnlockColumns
  | ExponentialColumns
  | LinearColumns
  | MonthlyColumns
  | StepperColumns
  | TimelockColumns
  | UnlockCliffColumns
  | UnlockLinearColumns;
