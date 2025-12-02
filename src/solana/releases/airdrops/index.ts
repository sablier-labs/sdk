import type { Sablier } from "@src/types";
import { release as releaseV0_1 } from "./v0.1";

export const airdrops: Record<Sablier.Solana.Version.Airdrops, Sablier.Solana.Release> = {
  "v0.1": releaseV0_1,
};
