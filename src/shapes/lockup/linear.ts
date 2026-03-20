/**
 * Linear-based (LL) lockup shapes.
 *
 * These shapes use the LockupLinear contract family and share common
 * EVM contract configurations.
 */

import {
  LOCKUP_EVM_LL,
  LOCKUP_EVM_LL_V2,
  LOCKUP_EVM_LL_V4,
  LOCKUP_SOLANA_LL,
} from "../constants.js";
import { Shape } from "../enums.js";
import { defineLockupShape } from "../types.js";

/**
 * Basic linear vesting.
 * Tokens vest continuously from start to end timestamp.
 */
export const linear = defineLockupShape(Shape.Lockup.Linear, {
  evm: LOCKUP_EVM_LL,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Linear",
  solana: LOCKUP_SOLANA_LL,
});

/**
 * Linear vesting with cliff.
 * No tokens vest until cliff, then linear vesting from cliff to end.
 */
export const cliff = defineLockupShape(Shape.Lockup.Cliff, {
  evm: LOCKUP_EVM_LL,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Cliff",
  solana: LOCKUP_SOLANA_LL,
});

/**
 * Linear with initial unlock, then linear vesting.
 * A percentage unlocks immediately, remainder vests linearly.
 */
export const linearUnlockLinear = defineLockupShape(Shape.Lockup.LinearUnlockLinear, {
  evm: LOCKUP_EVM_LL_V2,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Linear Unlock Linear",
  solana: LOCKUP_SOLANA_LL,
});

/**
 * Linear with initial unlock, then cliff.
 * A percentage unlocks immediately, remainder vests after cliff.
 */
export const linearUnlockCliff = defineLockupShape(Shape.Lockup.LinearUnlockCliff, {
  evm: LOCKUP_EVM_LL_V2,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Linear Unlock Cliff",
  solana: LOCKUP_SOLANA_LL,
});

/**
 * Step-based vesting via linear granularity.
 * Tokens vest in discrete steps at regular intervals using LockupLinear with granularity.
 *
 * @remarks
 * Replaces {@link tranchedStepper} by leveraging the granularity feature introduced in Lockup v4.0.
 */
export const linearStepper = defineLockupShape(Shape.Lockup.LinearStepper, {
  evm: LOCKUP_EVM_LL_V4,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Linear Stepper",
});

/**
 * Linear timelock.
 * All tokens unlock at a specific timestamp (no gradual vesting).
 */
export const linearTimelock = defineLockupShape(Shape.Lockup.LinearTimelock, {
  evm: LOCKUP_EVM_LL_V2,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Linear Timelock",
  solana: LOCKUP_SOLANA_LL,
});
