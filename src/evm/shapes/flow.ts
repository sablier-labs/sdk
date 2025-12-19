import { Protocol } from "../enums";
import { Shape } from "./enums";
import type { FlowShapeDefinition, FlowShapesRecord } from "./types";

export const flow: FlowShapeDefinition<Shape.Flow.Flow> = {
  contracts: [
    { contract: "SablierFlow", methods: ["create", "createAndDeposit"], version: "v2.0" },
    { contract: "SablierFlow", methods: ["create", "createAndDeposit"], version: "v1.1" },
    { contract: "SablierFlow", methods: ["create", "createAndDeposit"], version: "v1.0" },
  ],
  id: Shape.Flow.Flow,
  protocol: Protocol.Flow,
} satisfies FlowShapeDefinition;

/** All Flow shapes indexed by ID */
export const flowShapes = {
  [Shape.Flow.Flow]: flow,
} as const satisfies FlowShapesRecord;
