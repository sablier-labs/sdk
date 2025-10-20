import type * as enums from "./enums";

export namespace SolanaVersion {
  export type Airdrops = `${enums.Version.Airdrops}` | enums.Version.Airdrops;
  export type Lockup = `${enums.Version.Lockup}` | enums.Version.Lockup;
}

export type SolanaVersion = SolanaVersion.Airdrops | SolanaVersion.Lockup;
