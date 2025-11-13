import { sablierBatchLockupAbi } from "./abi/SablierBatchLockup";
import { sablierLockupAbi } from "./abi/SablierLockup";
import manifest from "./manifest";

export const abi = {
  [manifest.SABLIER_LOCKUP]: sablierLockupAbi,
  [manifest.SABLIER_BATCH_LOCKUP]: sablierBatchLockupAbi,
} as const;
