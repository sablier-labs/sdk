/**
 * Airdrop shapes.
 *
 * Merkle-based token distribution with various vesting patterns.
 */

import {
  AIRDROP_EVM_INSTANT,
  AIRDROP_EVM_LL,
  AIRDROP_EVM_LL_V2,
  AIRDROP_EVM_LT,
  AIRDROP_SOLANA_INSTANT,
} from "./constants";
import { Shape } from "./enums";
import type { AirdropShapesRecord } from "./types";
import { defineAirdropShape } from "./types";

/**
 * Instant airdrop.
 * Tokens are claimable immediately with no vesting.
 */
const instant = defineAirdropShape(Shape.Airdrops.Instant, {
  evm: AIRDROP_EVM_INSTANT,
  name: "Instant",
  solana: AIRDROP_SOLANA_INSTANT,
});

/**
 * Linear airdrop.
 * Claimed tokens vest linearly from start to end.
 */
const linear = defineAirdropShape(Shape.Airdrops.Linear, {
  evm: AIRDROP_EVM_LL,
  name: "Linear",
});

/**
 * Cliff airdrop.
 * Claimed tokens vest with a cliff period followed by linear vesting.
 */
const cliff = defineAirdropShape(Shape.Airdrops.Cliff, {
  evm: AIRDROP_EVM_LL,
  name: "Cliff",
});

/**
 * Linear with initial unlock, then linear vesting.
 * A percentage is immediately available, remainder vests linearly.
 */
const linearUnlockLinear = defineAirdropShape(Shape.Airdrops.LinearUnlockLinear, {
  evm: AIRDROP_EVM_LL_V2,
  name: "Linear Unlock Linear",
});

/**
 * Linear with initial unlock, then cliff.
 * A percentage is immediately available, remainder vests after cliff.
 */
const linearUnlockCliff = defineAirdropShape(Shape.Airdrops.LinearUnlockCliff, {
  evm: AIRDROP_EVM_LL_V2,
  name: "Linear Unlock Cliff",
});

/**
 * Step-based airdrop via tranches.
 * Claimed tokens unlock in discrete steps.
 */
const tranchedStepper = defineAirdropShape(Shape.Airdrops.TranchedStepper, {
  evm: AIRDROP_EVM_LT,
  name: "Tranched Stepper",
});

/**
 * All airdrop shapes indexed by shape ID.
 * Keys are alphabetically ordered for consistency.
 */
export const airdropShapes = {
  [Shape.Airdrops.Cliff]: cliff,
  [Shape.Airdrops.Instant]: instant,
  [Shape.Airdrops.Linear]: linear,
  [Shape.Airdrops.LinearUnlockCliff]: linearUnlockCliff,
  [Shape.Airdrops.LinearUnlockLinear]: linearUnlockLinear,
  [Shape.Airdrops.TranchedStepper]: tranchedStepper,
} satisfies AirdropShapesRecord;
