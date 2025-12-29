import { airdropShapes } from "./airdrops";
import { flowShapes } from "./flow";
import { lockupShapes } from "./lockup";

// Re-export individual shape modules
export { airdropShapes } from "./airdrops";
// Re-export enums and types
export * from "./enums";
export { flow, flowShapes } from "./flow";
export * from "./helpers";
export { lockupShapes } from "./lockup";
export * from "./types";

/** All shapes grouped by protocol */
export const shapes = {
  airdrops: airdropShapes,
  flow: flowShapes,
  lockup: lockupShapes,
};
