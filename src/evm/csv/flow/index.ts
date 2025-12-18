import type { BaseColumns } from "../types";

/** Flow stream: address, rate, interval, initialDeposit */
export type StreamColumns = BaseColumns & {
  /** Token amount per interval */
  rate: string;
  /** Time interval for rate (second, minute, hour, day, week, month, year) */
  interval: string;
  /** Initial deposit amount */
  initialDeposit: string;
};

export type Columns = StreamColumns;
