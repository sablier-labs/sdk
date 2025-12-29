import { Shape } from "./enums";
import type { FlowShapeDefinition, FlowShapesRecord } from "./types";

/**
 * Flow streaming shape.
 * Continuous streaming with real-time per-second vesting.
 */
export const flow: FlowShapeDefinition<Shape.Flow.Flow> = {
  evm: [
    { contract: "SablierFlow", createMethods: ["create", "createAndDeposit"], version: "v2.0" },
    { contract: "SablierFlow", createMethods: ["create", "createAndDeposit"], version: "v1.1" },
    { contract: "SablierFlow", createMethods: ["create", "createAndDeposit"], version: "v1.0" },
  ],
  id: Shape.Flow.Flow,
  name: "Flow",
} satisfies FlowShapeDefinition;

/** All Flow shapes indexed by ID */
export const flowShapes = {
  [Shape.Flow.Flow]: flow,
} as const satisfies FlowShapesRecord;
