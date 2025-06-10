import type { Sablier } from "@src/types";
import { release as releaseV1_1 } from "./v1.1";
import { release as releaseV1_2 } from "./v1.2";
import { release as releaseV1_3 } from "./v1.3";

export const airdrops: Record<Sablier.Version.Airdrops, Sablier.Release> = {
  "v1.1": releaseV1_1,
  "v1.2": releaseV1_2,
  "v1.3": releaseV1_3,
};
