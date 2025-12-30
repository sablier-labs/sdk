/**
 * Shared EVM and Solana contract configurations for shape definitions.
 *
 * These constants eliminate code duplication across shape files by providing
 * reusable contract/method mappings organized by lockup type (LL, LD, LT).
 *
 * @remarks
 * Arrays are marked `as const` for type safety. Consumers should treat them
 * as read-only - do not mutate `shape.evm` or `createMethods` arrays.
 */

import { Version } from "@src/evm/enums";
import type { ContractMethod, ProgramMethod } from "./types";

/* -------------------------------------------------------------------------- */
/*                        LOCKUP LINEAR (LL) CONTRACTS                        */
/* -------------------------------------------------------------------------- */

const LL_METHODS = ["createWithDurationsLL", "createWithTimestampsLL"] as const;
const LL_V1_METHODS = ["createWithDurations", "createWithTimestamps"] as const;

/** Lockup Linear contracts - full version history (v1.0 through v3.0) */
export const LOCKUP_EVM_LL = [
  { contract: "SablierLockup", createMethods: LL_METHODS, version: Version.Lockup.V3_0 },
  { contract: "SablierLockup", createMethods: LL_METHODS, version: Version.Lockup.V2_0 },
  { contract: "SablierV2LockupLinear", createMethods: LL_V1_METHODS, version: Version.Lockup.V1_2 },
  { contract: "SablierV2LockupLinear", createMethods: LL_V1_METHODS, version: Version.Lockup.V1_1 },
  { contract: "SablierV2LockupLinear", createMethods: LL_V1_METHODS, version: Version.Lockup.V1_0 },
] as const satisfies readonly ContractMethod[];

/** Lockup Linear contracts - v2.0+ only (for shapes added in v2.0) */
export const LOCKUP_EVM_LL_V2 = [
  { contract: "SablierLockup", createMethods: LL_METHODS, version: Version.Lockup.V3_0 },
  { contract: "SablierLockup", createMethods: LL_METHODS, version: Version.Lockup.V2_0 },
] as const satisfies readonly ContractMethod[];

/** Solana Lockup Linear program */
export const LOCKUP_SOLANA_LL = [
  {
    createMethods: ["create_with_durations_ll", "create_with_timestamps_ll"],
    program: "SablierLockupLinear",
    version: "v0.1",
  },
] as const satisfies readonly ProgramMethod[];

/* -------------------------------------------------------------------------- */
/*                       LOCKUP DYNAMIC (LD) CONTRACTS                        */
/* -------------------------------------------------------------------------- */

const LD_METHODS = ["createWithDurationsLD", "createWithTimestampsLD"] as const;
const LD_V1_METHODS = ["createWithDurations", "createWithTimestamps"] as const;

/** Lockup Dynamic contracts - full version history (v1.0 through v3.0) */
export const LOCKUP_EVM_LD = [
  { contract: "SablierLockup", createMethods: LD_METHODS, version: Version.Lockup.V3_0 },
  { contract: "SablierLockup", createMethods: LD_METHODS, version: Version.Lockup.V2_0 },
  {
    contract: "SablierV2LockupDynamic",
    createMethods: LD_V1_METHODS,
    version: Version.Lockup.V1_2,
  },
  {
    contract: "SablierV2LockupDynamic",
    createMethods: LD_V1_METHODS,
    version: Version.Lockup.V1_1,
  },
  {
    contract: "SablierV2LockupDynamic",
    createMethods: LD_V1_METHODS,
    version: Version.Lockup.V1_0,
  },
] as const satisfies readonly ContractMethod[];

/* -------------------------------------------------------------------------- */
/*                       LOCKUP TRANCHED (LT) CONTRACTS                       */
/* -------------------------------------------------------------------------- */

const LT_METHODS = ["createWithDurationsLT", "createWithTimestampsLT"] as const;
const LT_V1_METHODS = ["createWithDurations", "createWithTimestamps"] as const;

/** Lockup Tranched contracts - v1.2+ only (LT introduced in v1.2) */
export const LOCKUP_EVM_LT = [
  { contract: "SablierLockup", createMethods: LT_METHODS, version: Version.Lockup.V3_0 },
  { contract: "SablierLockup", createMethods: LT_METHODS, version: Version.Lockup.V2_0 },
  {
    contract: "SablierV2LockupTranched",
    createMethods: LT_V1_METHODS,
    version: Version.Lockup.V1_2,
  },
] as const satisfies readonly ContractMethod[];

/* -------------------------------------------------------------------------- */
/*                             FLOW CONTRACTS                                 */
/* -------------------------------------------------------------------------- */

/** Flow contracts - v1.0 through v2.0 */
export const FLOW_EVM = [
  {
    contract: "SablierFlow",
    createMethods: ["create", "createAndDeposit"],
    version: Version.Flow.V2_0,
  },
  {
    contract: "SablierFlow",
    createMethods: ["create", "createAndDeposit"],
    version: Version.Flow.V1_1,
  },
  {
    contract: "SablierFlow",
    createMethods: ["create", "createAndDeposit"],
    version: Version.Flow.V1_0,
  },
] as const satisfies readonly ContractMethod[];

/* -------------------------------------------------------------------------- */
/*                            AIRDROP CONTRACTS                               */
/* -------------------------------------------------------------------------- */

/** Airdrop Instant factory contracts - v1.3+ */
export const AIRDROP_EVM_INSTANT = [
  {
    contract: "SablierFactoryMerkleInstant",
    createMethods: ["createMerkleInstant"],
    version: Version.Airdrops.V2_0,
  },
  {
    contract: "SablierMerkleFactory",
    createMethods: ["createMerkleInstant"],
    version: Version.Airdrops.V1_3,
  },
] as const satisfies readonly ContractMethod[];

/** Solana Airdrop Instant program */
export const AIRDROP_SOLANA_INSTANT = [
  {
    createMethods: ["create_campaign"],
    program: "SablierMerkleInstant",
    version: "v0.1",
  },
] as const satisfies readonly ProgramMethod[];

/** Airdrop Linear (LL) factory contracts - full history */
export const AIRDROP_EVM_LL = [
  {
    contract: "SablierFactoryMerkleLL",
    createMethods: ["createMerkleLL"],
    version: Version.Airdrops.V2_0,
  },
  {
    contract: "SablierMerkleFactory",
    createMethods: ["createMerkleLL"],
    version: Version.Airdrops.V1_3,
  },
  {
    contract: "SablierV2MerkleLockupFactory",
    createMethods: ["createMerkleLL"],
    version: Version.Airdrops.V1_2,
  },
  {
    contract: "SablierV2MerkleStreamerFactory",
    createMethods: ["createMerkleStreamerLL"],
    version: Version.Airdrops.V1_1,
  },
] as const satisfies readonly ContractMethod[];

/** Airdrop Linear (LL) factory contracts - v2.0+ only */
export const AIRDROP_EVM_LL_V2 = [
  {
    contract: "SablierFactoryMerkleLL",
    createMethods: ["createMerkleLL"],
    version: Version.Airdrops.V2_0,
  },
] as const satisfies readonly ContractMethod[];

/** Airdrop Tranched (LT) factory contracts - v1.2+ */
export const AIRDROP_EVM_LT = [
  {
    contract: "SablierFactoryMerkleLT",
    createMethods: ["createMerkleLT"],
    version: Version.Airdrops.V2_0,
  },
  {
    contract: "SablierMerkleFactory",
    createMethods: ["createMerkleLT"],
    version: Version.Airdrops.V1_3,
  },
  {
    contract: "SablierV2MerkleLockupFactory",
    createMethods: ["createMerkleLT"],
    version: Version.Airdrops.V1_2,
  },
] as const satisfies readonly ContractMethod[];
