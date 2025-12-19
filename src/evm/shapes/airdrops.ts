import { Protocol } from "../enums";
import { Shape } from "./enums";
import type { AirdropShapeDefinition, AirdropShapesRecord } from "./types";

export const instant: AirdropShapeDefinition<Shape.Airdrops.Instant> = {
  contracts: [
    { contract: "SablierMerkleInstant", methods: ["claim"], version: "v2.0" },
    { contract: "SablierMerkleInstant", methods: ["claim"], version: "v1.3" },
  ],
  id: Shape.Airdrops.Instant,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

export const linear: AirdropShapeDefinition<Shape.Airdrops.Linear> = {
  contracts: [
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v2.0" },
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v1.3" },
    { contract: "SablierV2MerkleLL", methods: ["claim"], version: "v1.2" },
    { contract: "SablierV2MerkleStreamerLL", methods: ["claim"], version: "v1.1" },
  ],
  id: Shape.Airdrops.Linear,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

export const cliff: AirdropShapeDefinition<Shape.Airdrops.Cliff> = {
  contracts: [
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v2.0" },
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v1.3" },
    { contract: "SablierV2MerkleLL", methods: ["claim"], version: "v1.2" },
    { contract: "SablierV2MerkleStreamerLL", methods: ["claim"], version: "v1.1" },
  ],
  id: Shape.Airdrops.Cliff,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

export const unlockLinear: AirdropShapeDefinition<Shape.Airdrops.UnlockLinear> = {
  contracts: [
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v2.0" },
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v1.3" },
    { contract: "SablierV2MerkleLL", methods: ["claim"], version: "v1.2" },
    { contract: "SablierV2MerkleStreamerLL", methods: ["claim"], version: "v1.1" },
  ],
  id: Shape.Airdrops.UnlockLinear,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

export const unlockCliff: AirdropShapeDefinition<Shape.Airdrops.UnlockCliff> = {
  contracts: [
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v2.0" },
    { contract: "SablierMerkleLL", methods: ["claim"], version: "v1.3" },
    { contract: "SablierV2MerkleLL", methods: ["claim"], version: "v1.2" },
    { contract: "SablierV2MerkleStreamerLL", methods: ["claim"], version: "v1.1" },
  ],
  id: Shape.Airdrops.UnlockCliff,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

export const stepper: AirdropShapeDefinition<Shape.Airdrops.Stepper> = {
  contracts: [
    { contract: "SablierMerkleLT", methods: ["claim"], version: "v2.0" },
    { contract: "SablierMerkleLT", methods: ["claim"], version: "v1.3" },
    { contract: "SablierV2MerkleLT", methods: ["claim"], version: "v1.2" },
    { contract: "SablierV2MerkleStreamer", methods: ["claim"], version: "v1.1" },
  ],
  id: Shape.Airdrops.Stepper,
  protocol: Protocol.Airdrops,
} satisfies AirdropShapeDefinition;

/** All Airdrop shapes indexed by ID */
export const airdropShapes = {
  [Shape.Airdrops.Cliff]: cliff,
  [Shape.Airdrops.Instant]: instant,
  [Shape.Airdrops.Linear]: linear,
  [Shape.Airdrops.Stepper]: stepper,
  [Shape.Airdrops.UnlockCliff]: unlockCliff,
  [Shape.Airdrops.UnlockLinear]: unlockLinear,
} as const satisfies AirdropShapesRecord;
