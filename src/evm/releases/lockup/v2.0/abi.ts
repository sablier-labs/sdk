import { sablierBatchLockupAbi } from "./abi/SablierBatchLockup.js";
import { sablierLockupAbi } from "./abi/SablierLockup.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_LOCKUP]: sablierLockupAbi,
  [manifest.SABLIER_BATCH_LOCKUP]: sablierBatchLockupAbi,
} as const;
