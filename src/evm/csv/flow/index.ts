/** Flow stream: address, rateAmount, rateInterval, initialDepositAmount */
export type StreamColumns = {
  /** Recipient wallet address */
  address: string;
  /** Token amount per interval */
  rateAmount: string;
  /** Time interval for rate (second, minute, hour, day, week, month, year) */
  rateInterval: string;
  /** Initial deposit amount */
  initialDepositAmount: string;
};

export type Columns = StreamColumns;
