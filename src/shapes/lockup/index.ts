/**
 * Lockup shapes aggregation module.
 *
 * Re-exports all lockup shapes organized by curve type and provides
 * the combined lockupShapes record.
 */

import { Shape } from "../enums";
import type { LockupShapesRecord } from "../types";
import * as dynamic from "./dynamic";
import * as linear from "./linear";
import * as tranched from "./tranched";

/**
 * All lockup shapes indexed by shape ID.
 * Keys are alphabetically ordered for consistency. Please maintain this order.
 */
export const lockupShapes = {
  /* -------------------------------------------------------------------------- */
  /*                                   DYNAMIC                                  */
  /* -------------------------------------------------------------------------- */
  [Shape.Lockup.DynamicCliffExponential]: dynamic.dynamicCliffExponential,
  [Shape.Lockup.DynamicDoubleUnlock]: dynamic.dynamicDoubleUnlock,
  [Shape.Lockup.DynamicExponential]: dynamic.dynamicExponential,
  [Shape.Lockup.DynamicMonthly]: dynamic.dynamicMonthly,
  [Shape.Lockup.DynamicStepper]: dynamic.dynamicStepper,
  [Shape.Lockup.DynamicTimelock]: dynamic.dynamicTimelock,
  [Shape.Lockup.DynamicUnlockCliff]: dynamic.dynamicUnlockCliff,
  [Shape.Lockup.DynamicUnlockLinear]: dynamic.dynamicUnlockLinear,
  /* -------------------------------------------------------------------------- */
  /*                                   LINEAR                                   */
  /* -------------------------------------------------------------------------- */
  [Shape.Lockup.Cliff]: linear.cliff,
  [Shape.Lockup.Linear]: linear.linear,
  [Shape.Lockup.LinearTimelock]: linear.linearTimelock,
  [Shape.Lockup.LinearUnlockCliff]: linear.linearUnlockCliff,
  [Shape.Lockup.LinearUnlockLinear]: linear.linearUnlockLinear,
  /* -------------------------------------------------------------------------- */
  /*                                  TRANCHED                                  */
  /* -------------------------------------------------------------------------- */
  [Shape.Lockup.TranchedBackweighted]: tranched.tranchedBackweighted,
  [Shape.Lockup.TranchedMonthly]: tranched.tranchedMonthly,
  [Shape.Lockup.TranchedStepper]: tranched.tranchedStepper,
  [Shape.Lockup.TranchedTimelock]: tranched.tranchedTimelock,
} satisfies LockupShapesRecord;

// Re-export individual shapes for direct imports
export * from "./dynamic";
export * from "./linear";
export * from "./tranched";
