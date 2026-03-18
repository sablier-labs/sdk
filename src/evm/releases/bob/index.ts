import type { Sablier } from "@/src/types.js";
import { release as releaseV1_0 } from "./v1.0/index.js";

export const bob = {
  "v1.0": releaseV1_0,
} satisfies Record<Sablier.EVM.Version.Bob, Sablier.EVM.Release>;
