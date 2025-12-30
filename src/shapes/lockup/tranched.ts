/**
 * Tranched-style lockup shapes.
 *
 * Most shapes here use the LockupTranched (LT) contract family with discrete
 * tranche-based unlocks. Some use LockupDynamic (LD) for historical compatibility.
 *
 * @remarks
 * LockupTranched was introduced in v1.2 (July 2024).
 */

import { LOCKUP_EVM_LD, LOCKUP_EVM_LT } from "../constants";
import { Shape } from "../enums";
import { defineLockupShape } from "../types";

/**
 * Step-based vesting via tranches.
 * Tokens unlock in discrete steps at regular intervals.
 */
export const tranchedStepper = defineLockupShape(Shape.Lockup.TranchedStepper, {
  evm: LOCKUP_EVM_LT,
  name: "Tranched Stepper",
});

/**
 * Monthly vesting via tranches.
 * Tokens unlock monthly.
 */
export const tranchedMonthly = defineLockupShape(Shape.Lockup.TranchedMonthly, {
  evm: LOCKUP_EVM_LT,
  name: "Tranched Monthly",
});

/**
 * Tranched timelock.
 * All tokens unlock at a specific timestamp via a single tranche.
 */
export const tranchedTimelock = defineLockupShape(Shape.Lockup.TranchedTimelock, {
  evm: LOCKUP_EVM_LT,
  name: "Tranched Timelock",
});

/**
 * Backweighted tranches.
 * Larger amounts unlock toward the end of the schedule.
 *
 * @remarks
 * Uses LockupDynamic (LD) contracts for historical reasons.
 */
export const tranchedBackweighted = defineLockupShape(Shape.Lockup.TranchedBackweighted, {
  evm: LOCKUP_EVM_LD,
  name: "Tranched Backweighted",
});

/**
 * Double unlock pattern.
 * Two distinct unlock events with a waiting period between.
 *
 * @remarks
 * Despite the "dynamic" name, this shape uses LockupTranched (LT) contracts
 * because it's implemented with discrete tranches rather than continuous segments.
 */
export const dynamicDoubleUnlock = defineLockupShape(Shape.Lockup.DynamicDoubleUnlock, {
  evm: LOCKUP_EVM_LT,
  name: "Dynamic Double Unlock",
});
