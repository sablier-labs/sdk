import type { Columns as AirdropColumns } from "./airdrops";
import type { Columns as FlowColumns } from "./flow";
import type { DurationColumns, RangeColumns } from "./lockup";

/**
 * All supported timing modes
 */
export const TIMINGS = ["duration", "range"] as const;

/**
 * Timing mode: determines whether streams use relative durations or absolute timestamps
 * @derived from TIMINGS const array
 */
export type Timing = (typeof TIMINGS)[number];

/** Common columns for all templates */
export type BaseColumns = {
  /** Recipient wallet address */
  address: string;
  /** Token amount to stream */
  amount: string;
};

/** All template column types */
export type Columns = AirdropColumns | FlowColumns | DurationColumns | RangeColumns;
