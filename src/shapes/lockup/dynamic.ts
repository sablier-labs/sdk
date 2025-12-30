/**
 * Dynamic-based (LD) lockup shapes.
 *
 * These shapes use the LockupDynamic contract family with custom
 * segment-based vesting curves.
 */

import { LOCKUP_EVM_LD } from "../constants";
import { Shape } from "../enums";
import { defineLockupShape } from "../types";

/**
 * Exponential vesting curve.
 * Tokens vest slowly at first, then accelerate toward the end.
 */
export const dynamicExponential = defineLockupShape(Shape.Lockup.DynamicExponential, {
  evm: LOCKUP_EVM_LD,
  name: "Dynamic Exponential",
});

/**
 * Cliff followed by exponential vesting.
 * No tokens until cliff, then exponential acceleration.
 */
export const dynamicCliffExponential = defineLockupShape(Shape.Lockup.DynamicCliffExponential, {
  evm: LOCKUP_EVM_LD,
  name: "Dynamic Cliff Exponential",
});

/**
 * Dynamic timelock.
 * All tokens unlock at a specific timestamp via dynamic segments.
 *
 * @remarks
 * Timelocks used to be created with LockupDynamic (from 2023 through early 2024).
 * When LockupTranched shipped in July 2024, new timelocks use LockupTranched instead.
 * @see https://github.com/sablier-labs/lockup/blob/main/CHANGELOG.md
 */
export const dynamicTimelock = defineLockupShape(Shape.Lockup.DynamicTimelock, {
  evm: LOCKUP_EVM_LD,
  name: "Dynamic Timelock",
});

/**
 * Monthly vesting via dynamic segments.
 * Tokens unlock in monthly increments.
 */
export const dynamicMonthly = defineLockupShape(Shape.Lockup.DynamicMonthly, {
  evm: LOCKUP_EVM_LD,
  name: "Dynamic Monthly",
});

/**
 * Step-based vesting via dynamic segments.
 * Tokens unlock in discrete steps at regular intervals.
 */
export const dynamicStepper = defineLockupShape(Shape.Lockup.DynamicStepper, {
  evm: LOCKUP_EVM_LD,
  name: "Dynamic Stepper",
});

/**
 * Dynamic with initial unlock, then cliff.
 * A percentage unlocks immediately, remainder after cliff via segments.
 */
export const dynamicUnlockCliff = defineLockupShape(Shape.Lockup.DynamicUnlockCliff, {
  evm: LOCKUP_EVM_LD,
  name: "Dynamic Unlock Cliff",
});

/**
 * Dynamic with initial unlock, then linear vesting.
 * A percentage unlocks immediately, remainder vests linearly via segments.
 */
export const dynamicUnlockLinear = defineLockupShape(Shape.Lockup.DynamicUnlockLinear, {
  evm: LOCKUP_EVM_LD,
  name: "Dynamic Unlock Linear",
});
