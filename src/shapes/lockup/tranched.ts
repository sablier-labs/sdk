/**
 * Tranched-style lockup shapes.
 *
 * These shapes use the LockupTranched (LT) contract family with discrete
 * tranche-based unlocks.
 *
 * @remarks
 * LockupTranched was introduced in v1.2 (July 2024).
 */

import { LOCKUP_EVM_LT } from "../contracts.js";
import { Shape } from "../enums.js";
import { defineLockupShape } from "../types.js";

/**
 * Step-based vesting via tranches.
 * Tokens unlock in discrete steps at regular intervals.
 *
 * @remarks
 * Deprecated in favor of {@link linearStepper}, which uses LockupLinear with the
 * granularity feature introduced in Lockup v4.0.
 */
export const tranchedStepper = defineLockupShape(Shape.Lockup.TranchedStepper, {
  evm: LOCKUP_EVM_LT,
  hasPredictableGas: false,
  isDeprecated: true,
  name: "Tranched Stepper",
});

/**
 * Monthly vesting via tranches.
 * Tokens unlock monthly.
 */
export const tranchedMonthly = defineLockupShape(Shape.Lockup.TranchedMonthly, {
  evm: LOCKUP_EVM_LT,
  hasPredictableGas: false,
  isDeprecated: false,
  name: "Tranched Monthly",
});

/**
 * Tranched timelock.
 * All tokens unlock at a specific timestamp via a single tranche.
 */
export const tranchedTimelock = defineLockupShape(Shape.Lockup.TranchedTimelock, {
  evm: LOCKUP_EVM_LT,
  hasPredictableGas: true,
  isDeprecated: false,
  name: "Tranched Timelock",
});

/**
 * Backweighted tranches.
 * Larger amounts unlock toward the end of the schedule.
 */
export const tranchedBackweighted = defineLockupShape(Shape.Lockup.TranchedBackweighted, {
  evm: LOCKUP_EVM_LT,
  hasPredictableGas: false,
  isDeprecated: false,
  name: "Tranched Backweighted",
});
