import type { BaseColumns } from "../../types";
import type {
  TranchedBackweightedColumns as DurationTranchedBackweightedColumns,
  TranchedMonthlyColumns as DurationTranchedMonthlyColumns,
} from "../duration/index";

/**
 * Tranched backweighted with range: address, amount, start, years, unlocks
 * @note Identical to duration TranchedBackweightedColumns because backweighted vesting inherently uses
 * absolute timestamps (start date + number of years), not relative durations
 */
export type TranchedBackweightedColumns = DurationTranchedBackweightedColumns;

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
 * Dynamic cliff-exponential with range: address, amount, start, end, cliffEnd, cliffAmount
 * @note Structurally identical to CliffColumns; the shape difference is semantic only
 */
export type DynamicCliffExponentialColumns = CliffColumns;

/** Dynamic double-unlock with range: address, amount, start, end, firstUnlockEnd, firstUnlockAmount, secondUnlockEnd, secondUnlockAmount */
export type DynamicDoubleUnlockColumns = LinearColumns & {
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
 * Dynamic exponential with range: address, amount, start, end
 * @note Structurally identical to LinearColumns; the shape difference is semantic only
 */
export type DynamicExponentialColumns = LinearColumns;

/**
 * Tranched monthly with range: address, amount, start, months, initial
 * @note Identical to duration TranchedMonthlyColumns because monthly vesting inherently uses
 * absolute timestamps (start date + number of months), not relative durations
 */
export type TranchedMonthlyColumns = DurationTranchedMonthlyColumns;

/** Tranched stepper with range: address, amount, start, end, steps */
export type TranchedStepperColumns = LinearColumns & {
  /** Number of discrete unlock steps */
  steps: string;
};

/** Tranched timelock with range: address, amount, end */
export type TranchedTimelockColumns = BaseColumns & {
  /** End timestamp when tokens unlock */
  end: string;
};

/** Linear unlock-cliff with range: address, amount, start, end, cliffEnd, unlock, cliffAmount */
export type LinearUnlockCliffColumns = LinearColumns & {
  /** Cliff end timestamp */
  cliffEnd: string;
  /** Immediate unlock percentage */
  unlock: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/** Linear unlock-linear with range: address, amount, start, end, unlock */
export type LinearUnlockLinearColumns = LinearColumns & {
  /** Immediate unlock percentage */
  unlock: string;
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
