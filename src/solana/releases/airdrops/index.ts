import type { Sablier } from "@src/types.js";
import { release as releaseV0_1 } from "./v0.1/index.js";

export const airdrops: Record<Sablier.Solana.Version.Airdrops, Sablier.Solana.Release> = {
  "v0.1": releaseV0_1,
};
