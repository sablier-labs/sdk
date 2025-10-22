import type { Sablier } from "@src/types";
import { release as releaseV1_0 } from "./v1.0";
import { release as releaseV1_1 } from "./v1.1";
import { release as releaseV2_0 } from "./v2.0";

export const flow: Record<Sablier.EVM.Version.Flow, Sablier.EVM.Release> = {
  "v1.0": releaseV1_0,
  "v1.1": releaseV1_1,
  "v2.0": releaseV2_0,
};
