/**
 * Flow shapes.
 *
 * Continuous streaming with real-time per-second vesting.
 */

import { FLOW_EVM } from "./constants";
import { Shape } from "./enums";
import type { FlowShapesRecord } from "./types";
import { defineFlowShape } from "./types";

/**
 * Flow streaming.
 * Continuous streaming with adjustable rate and real-time withdrawals.
 */
export const flow = defineFlowShape(Shape.Flow.Flow, {
  evm: FLOW_EVM,
  isDeprecated: false,
  name: "Flow",
});

/** All Flow shapes indexed by ID */
export const flowShapes = {
  [Shape.Flow.Flow]: flow,
} as const satisfies FlowShapesRecord;
