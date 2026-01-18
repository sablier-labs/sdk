import type { Sablier } from "@/src/types.js";
import { release as releaseV1_1 } from "./v1.1/index.js";
import { release as releaseV1_2 } from "./v1.2/index.js";
import { release as releaseV1_3 } from "./v1.3/index.js";
import { release as releaseV2_0 } from "./v2.0/index.js";

export const airdrops = {
  "v1.1": releaseV1_1,
  "v1.2": releaseV1_2,
  "v1.3": releaseV1_3,
  "v2.0": releaseV2_0,
} satisfies Record<Sablier.EVM.Version.Airdrops, Sablier.EVM.Release>;
