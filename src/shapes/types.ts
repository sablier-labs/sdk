import type { EVM } from "@src/evm/types";
import type { Solana } from "@src/solana/types";
import type { Shape } from "./enums";

/** An EVM contract method that can create a stream with a shape */
export type ContractMethod = {
  /** Contract name from manifest (e.g., "SablierLockup", "SablierV2LockupLinear") */
  contract: string;
  /** Method names that create this shape (e.g., ["createWithDurationsLL", "createWithTimestampsLL"]) */
  createMethods: string[];
  /** Protocol version (e.g., "v3.0") */
  version: EVM.Version;
};

/** A Solana program method that can create a stream with a shape */
export type ProgramMethod = {
  /** Program name from manifest (e.g., "SablierLockupLinear") */
  program: string;
  /** Method names that create this shape (e.g., ["create_with_durations_ll"]) */
  createMethods: string[];
  /** Protocol version (e.g., "v0.1") */
  version: Solana.Version;
};

/** Base unified shape definition */
type BaseUnifiedShape<TId extends string> = {
  /** Shape identifier */
  id: TId;
  /** Human-readable name */
  name: string;
  /** All EVM contract/method combinations that can create this shape */
  evm: ContractMethod[];
  /** All Solana program/method combinations that can create this shape (if supported) */
  solana?: ProgramMethod[];
};

/** Lockup shape definition with unified platform support */
export type LockupShapeDefinition<TId extends Shape.Lockup = Shape.Lockup> = BaseUnifiedShape<TId>;

/** Flow shape definition (EVM only) */
export type FlowShapeDefinition<TId extends Shape.Flow = Shape.Flow> = Omit<
  BaseUnifiedShape<TId>,
  "solana"
>;

/** Airdrop shape definition with unified platform support */
export type AirdropShapeDefinition<TId extends Shape.Airdrops = Shape.Airdrops> =
  BaseUnifiedShape<TId>;

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

/** Any unified shape type */
export type AnyShape = LockupShapeDefinition | FlowShapeDefinition | AirdropShapeDefinition;

/** Shapes that have Solana support (with required solana field) */
export type ShapeWithSolanaSupport = AnyShape & { solana: ProgramMethod[] };
