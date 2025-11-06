import type { Sablier } from "@src/types";
import { release as releaseV1_0 } from "./v1.0";
import { release as releaseV1_1 } from "./v1.1";

export const legacy: Record<Sablier.EVM.Version.Legacy, Sablier.EVM.Release> = {
  "v1.0": releaseV1_0,
  "v1.1": releaseV1_1,
} satisfies Record<Sablier.EVM.Version.Legacy, Sablier.EVM.Release>;
