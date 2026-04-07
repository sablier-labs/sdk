import { airdrops } from "./airdrops/index.js";
import { bob } from "./bob/index.js";
import { flow } from "./flow/index.js";
import { legacy } from "./legacy/index.js";
import { lockup } from "./lockup/index.js";

export const releases: Record<
  string,
  Record<string, import("@/src/types.js").Sablier.EVM.Release>
> = {
  airdrops,
  bob,
  flow,
  legacy,
  lockup,
};
