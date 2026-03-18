import { sablierBobAbi } from "./abi/SablierBob.js";
import { sablierEscrowAbi } from "./abi/SablierEscrow.js";
import { sablierLidoAdapterAbi } from "./abi/SablierLidoAdapter.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_BOB]: sablierBobAbi,
  [manifest.SABLIER_ESCROW]: sablierEscrowAbi,
  [manifest.SABLIER_LIDO_ADAPTER]: sablierLidoAdapterAbi,
} as const;
