import { airdrops } from "./airdrops/index.js";
import { bob } from "./bob/index.js";
import { flow } from "./flow/index.js";
import { legacy } from "./legacy/index.js";
import { lockup } from "./lockup/index.js";

export const releases = {
  airdrops,
  bob,
  flow,
  legacy,
  lockup,
} satisfies Record<string, Record<string, import("@/src/types.js").Sablier.EVM.Release>>;
