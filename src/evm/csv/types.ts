import type { Columns as AirdropColumns } from "./airdrops";
import type { Columns as FlowColumns } from "./flow";
import type { DurationColumns, RangeColumns } from "./lockup";

/**
 * All supported timing modes
 */
export const TIMINGS = ["duration", "range"] as const;

/**
 * All supported vesting shapes
 */
export const SHAPES = [
  "instant", // airdrops
  "stream", // flow
  "backweighted", // lockup
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

/** Common columns for all templates */
export type BaseColumns = {
  /** Recipient wallet address */
  address: string;
  /** Token amount to stream */
  amount: string;
};

/** All template column types */
export type Columns = AirdropColumns | FlowColumns | DurationColumns | RangeColumns;
