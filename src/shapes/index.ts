import { airdropShapes } from "./airdrops.js";
import { flowShapes } from "./flow.js";
import { lockupShapes } from "./lockup/index.js";

// Re-export individual shape modules
export { airdropShapes } from "./airdrops.js";
// Re-export enums and types
export * from "./enums.js";
export { flow, flowShapes } from "./flow.js";
export * from "./helpers.js";
export { lockupShapes } from "./lockup/index.js";
export * from "./types.js";

/** All shapes grouped by protocol */
export const shapes = {
  airdrops: airdropShapes,
  flow: flowShapes,
  lockup: lockupShapes,
};
