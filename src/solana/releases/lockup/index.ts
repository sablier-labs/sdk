import type { Sablier } from "@src/types";
import { release as releaseV1_0 } from "./v1.0";

export const lockup: Record<Sablier.Solana.Version.Lockup, Sablier.Solana.Release> = {
  "v1.0": releaseV1_0,
};
