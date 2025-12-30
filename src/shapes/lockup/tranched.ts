/**
 * Tranched-style lockup shapes.
 *
 * These shapes use the LockupTranched (LT) contract family with discrete
 * tranche-based unlocks.
 *
 * @remarks
 * LockupTranched was introduced in v1.2 (July 2024).
 */

import { LOCKUP_EVM_LT } from "../constants";
import { Shape } from "../enums";
import { defineLockupShape } from "../types";

/**
 * Step-based vesting via tranches.
 * Tokens unlock in discrete steps at regular intervals.
 */
export const tranchedStepper = defineLockupShape(Shape.Lockup.TranchedStepper, {
  evm: LOCKUP_EVM_LT,
  isDeprecated: false,
  name: "Tranched Stepper",
});

/**
 * Monthly vesting via tranches.
 * Tokens unlock monthly.
 */
export const tranchedMonthly = defineLockupShape(Shape.Lockup.TranchedMonthly, {
  evm: LOCKUP_EVM_LT,
  isDeprecated: false,
  name: "Tranched Monthly",
});

/**
 * Tranched timelock.
 * All tokens unlock at a specific timestamp via a single tranche.
 */
export const tranchedTimelock = defineLockupShape(Shape.Lockup.TranchedTimelock, {
  evm: LOCKUP_EVM_LT,
  isDeprecated: false,
  name: "Tranched Timelock",
});

/**
 * Backweighted tranches.
 * Larger amounts unlock toward the end of the schedule.
 */
export const tranchedBackweighted = defineLockupShape(Shape.Lockup.TranchedBackweighted, {
  evm: LOCKUP_EVM_LT,
  isDeprecated: false,
  name: "Tranched Backweighted",
});
