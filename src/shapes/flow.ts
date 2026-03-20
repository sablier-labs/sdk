/**
 * Flow shapes.
 *
 * Continuous streaming with real-time per-second vesting.
 */

import { FLOW_EVM } from "./contracts.js";
import { Shape } from "./enums.js";
import type { FlowShapesRecord } from "./types.js";
import { defineFlowShape } from "./types.js";

/**
 * Flow streaming.
 * Continuous streaming with adjustable rate and real-time withdrawals.
 */
export const flow = defineFlowShape(Shape.Flow.Flow, {
  evm: FLOW_EVM,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Flow",
});

/** All Flow shapes indexed by ID */
export const flowShapes = {
  [Shape.Flow.Flow]: flow,
} as const satisfies FlowShapesRecord;
