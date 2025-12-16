/**
 * All supported timing modes
 */
export const TIMINGS = ["duration", "range"] as const;

/**
 * All supported vesting shapes
 */
export const SHAPES = [
  "backweighted",
  "cliff",
  "cliff-exponential",
  "double-unlock",
  "exponential",
  "linear",
  "monthly",
  "stepper",
  "timelock",
  "unlock-cliff",
  "unlock-linear",
] as const;

/**
 * Timing mode: determines whether streams use relative durations or absolute timestamps
 * @derived from TIMINGS const array
 */
export type Timing = (typeof TIMINGS)[number];

/**
 * Shape: the vesting curve type
 * @derived from SHAPES const array
 */
export type Shape = (typeof SHAPES)[number];

// =============================================================================
// Base Column Types
// =============================================================================

/** Common columns for all templates */
export type BaseColumns = {
  /** Recipient wallet address */
  address: string;
  /** Token amount to stream */
  amount: string;
};

// =============================================================================
// Duration Template Column Types
// =============================================================================

/** Backweighted with start: address, amount, start, years, unlocks */
export type DurationBackweightedColumns = BaseColumns & {
  /** Start timestamp */
  start: string;
  /** Number of years */
  years: string;
  /** Unlock percentages (e.g., "10;20;30;40") */
  unlocks: string;
};

/** Cliff vesting with duration: address, amount, duration, cliffDuration, cliffAmount */
export type DurationCliffColumns = DurationLinearColumns & {
  /** Cliff duration (e.g., "1 years 45 days 6 hours") */
  cliffDuration: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/**
 * Cliff-exponential with duration: address, amount, duration, cliffDuration, cliffAmount
 * @note Structurally identical to DurationCliffColumns; the shape difference is semantic only
 */
export type DurationCliffExponentialColumns = DurationCliffColumns;

/** Double-unlock with duration: address, amount, duration, firstUnlockDuration, firstUnlockAmount, secondUnlockDuration, secondUnlockAmount */
export type DurationDoubleUnlockColumns = DurationLinearColumns & {
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
 * Exponential vesting with duration: address, amount, duration
 * @note Structurally identical to DurationLinearColumns; the shape difference is semantic only
 */
export type DurationExponentialColumns = DurationLinearColumns;

/** Linear vesting with duration: address, amount, duration */
export type DurationLinearColumns = BaseColumns & {
  /** Relative duration (e.g., "2 years 20 days") */
  duration: string;
};

/** Monthly with start: address, amount, start, months, initial */
export type DurationMonthlyColumns = BaseColumns & {
  /** Start timestamp (e.g., "2026-01-12 16:15") */
  start: string;
  /** Number of months */
  months: string;
  /** Initial unlock timing ("at start" or similar) */
  initial: string;
};

/** Stepper with duration: address, amount, duration, steps */
export type DurationStepperColumns = DurationLinearColumns & {
  /** Number of discrete unlock steps */
  steps: string;
};

/**
 * Timelock with duration: address, amount, duration
 * @note Structurally identical to DurationLinearColumns; the shape difference is semantic only
 */
export type DurationTimelockColumns = DurationLinearColumns;

/** Unlock-cliff with duration: address, amount, duration, cliffDuration, unlock, cliffAmount */
export type DurationUnlockCliffColumns = DurationLinearColumns & {
  /** Cliff duration */
  cliffDuration: string;
  /** Immediate unlock percentage */
  unlock: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/** Unlock-linear with duration: address, amount, duration, unlock */
export type DurationUnlockLinearColumns = DurationLinearColumns & {
  /** Immediate unlock percentage */
  unlock: string;
};

// =============================================================================
// Range Template Column Types
// =============================================================================

/**
 * Backweighted with range: address, amount, start, years, unlocks
 * @note Identical to DurationBackweightedColumns because backweighted vesting inherently uses
 * absolute timestamps (start date + number of years), not relative durations
 */
export type RangeBackweightedColumns = DurationBackweightedColumns;

/** Cliff with range: address, amount, start, end, cliffEnd, cliffAmount */
export type RangeCliffColumns = RangeLinearColumns & {
  /** Cliff end timestamp */
  cliffEnd: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/**
 * Cliff-exponential with range: address, amount, start, end, cliffEnd, cliffAmount
 * @note Structurally identical to RangeCliffColumns; the shape difference is semantic only
 */
export type RangeCliffExponentialColumns = RangeCliffColumns;

/** Double-unlock with range: address, amount, start, end, firstUnlockEnd, firstUnlockAmount, secondUnlockEnd, secondUnlockAmount */
export type RangeDoubleUnlockColumns = RangeLinearColumns & {
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
 * @note Structurally identical to RangeLinearColumns; the shape difference is semantic only
 */
export type RangeExponentialColumns = RangeLinearColumns;

/** Linear vesting with range: address, amount, start, end */
export type RangeLinearColumns = BaseColumns & {
  /** Start timestamp (e.g., "2024-01-12 16:15") */
  start: string;
  /** End timestamp */
  end: string;
};

/**
 * Monthly with range: address, amount, start, months, initial
 * @note Identical to DurationMonthlyColumns because monthly vesting inherently uses
 * absolute timestamps (start date + number of months), not relative durations
 */
export type RangeMonthlyColumns = DurationMonthlyColumns;

/** Stepper with range: address, amount, start, end, steps */
export type RangeStepperColumns = RangeLinearColumns & {
  /** Number of discrete unlock steps */
  steps: string;
};

/** Timelock with range: address, amount, end */
export type RangeTimelockColumns = BaseColumns & {
  /** End timestamp when tokens unlock */
  end: string;
};

/** Unlock-cliff with range: address, amount, start, end, cliffEnd, unlock, cliffAmount */
export type RangeUnlockCliffColumns = RangeLinearColumns & {
  /** Cliff end timestamp */
  cliffEnd: string;
  /** Immediate unlock percentage */
  unlock: string;
  /** Amount unlocked at cliff */
  cliffAmount: string;
};

/** Unlock-linear with range: address, amount, start, end, unlock */
export type RangeUnlockLinearColumns = RangeLinearColumns & {
  /** Immediate unlock percentage */
  unlock: string;
};

// =============================================================================
// Union Types
// =============================================================================

/** All duration template column types */
export type DurationColumns =
  | DurationBackweightedColumns
  | DurationCliffColumns
  | DurationCliffExponentialColumns
  | DurationDoubleUnlockColumns
  | DurationExponentialColumns
  | DurationLinearColumns
  | DurationMonthlyColumns
  | DurationStepperColumns
  | DurationTimelockColumns
  | DurationUnlockCliffColumns
  | DurationUnlockLinearColumns;

/** All range template column types */
export type RangeColumns =
  | RangeBackweightedColumns
  | RangeCliffColumns
  | RangeCliffExponentialColumns
  | RangeDoubleUnlockColumns
  | RangeExponentialColumns
  | RangeLinearColumns
  | RangeMonthlyColumns
  | RangeStepperColumns
  | RangeTimelockColumns
  | RangeUnlockCliffColumns
  | RangeUnlockLinearColumns;

/** All template column types */
export type Columns = DurationColumns | RangeColumns;
