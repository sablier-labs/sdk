import type { Protocol } from "../enums";
import type { EVM } from "../types";
import type { Shape } from "./enums";

/** A contract method that can create a stream with a shape */
export type ContractMethod = {
  /** Contract name from manifest (e.g., "SablierLockup", "SablierV2LockupLinear") */
  contract: string;
  /** Method names that create this shape (e.g., ["createWithDurationsLL", "createWithTimestampsLL"]) */
  createMethods: string[];
  /** Protocol version (e.g., "v3.0") */
  version: EVM.Version;
};

/** Base shape definition */
type BaseShape<TId extends string> = {
  /** Shape identifier */
  id: TId;
  /** All contract/method combinations that can create this shape */
  contracts: ContractMethod[];
};

/** Lockup shape definition with contract metadata */
export type LockupShapeDefinition<TId extends Shape.Lockup = Shape.Lockup> = BaseShape<TId> & {
  protocol: Protocol.Lockup;
};

/** Flow shape definition with contract metadata */
export type FlowShapeDefinition<TId extends Shape.Flow = Shape.Flow> = BaseShape<TId> & {
  protocol: Protocol.Flow;
};

/** Airdrop shape definition with contract metadata */
export type AirdropShapeDefinition<TId extends Shape.Airdrops = Shape.Airdrops> = BaseShape<TId> & {
  protocol: Protocol.Airdrops;
};

/** Lockup shape identifier (string union) */
export type LockupShape = `${Shape.Lockup}`;

/** Flow shape identifier (string union) */
export type FlowShape = `${Shape.Flow}`;

/** Airdrop shape identifier (string union) */
export type AirdropShape = `${Shape.Airdrops}`;

/** Record type ensuring all Lockup shapes are defined */
export type LockupShapesRecord = {
  [K in Shape.Lockup]: LockupShapeDefinition<K>;
};

/** Record type ensuring all Flow shapes are defined */
export type FlowShapesRecord = {
  [K in Shape.Flow]: FlowShapeDefinition<K>;
};

/** Record type ensuring all Airdrop shapes are defined */
export type AirdropShapesRecord = {
  [K in Shape.Airdrops]: AirdropShapeDefinition<K>;
};
