import { sablierV2LockupAbi } from "./abi/SablierV2Lockup";
import { sablierV2LockupDynamicAbi } from "./abi/SablierV2LockupDynamic";
import { sablierV2LockupLinearAbi } from "./abi/SablierV2LockupLinear";
import manifest from "./manifest";

export const abi = {
  [manifest.core.SABLIER_V2_LOCKUP]: sablierV2LockupAbi,
  [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: sablierV2LockupDynamicAbi,
  [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: sablierV2LockupLinearAbi,
} as const;
