import { sablierV2LockupAbi } from "./abi/SablierV2Lockup.js";
import { sablierV2LockupDynamicAbi } from "./abi/SablierV2LockupDynamic.js";
import { sablierV2LockupLinearAbi } from "./abi/SablierV2LockupLinear.js";
import { sablierV2LockupTranchedAbi } from "./abi/SablierV2LockupTranched.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.core.SABLIER_V2_LOCKUP]: sablierV2LockupAbi,
  [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: sablierV2LockupDynamicAbi,
  [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: sablierV2LockupLinearAbi,
  [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: sablierV2LockupTranchedAbi,
} as const;
