import { bobVaultShareAbi } from "./abi/BobVaultShare.js";
import { sablierBobAbi } from "./abi/SablierBob.js";
import { sablierEscrowAbi } from "./abi/SablierEscrow.js";
import { sablierLidoAdapterAbi } from "./abi/SablierLidoAdapter.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.BOB_VAULT_SHARE]: bobVaultShareAbi,
  [manifest.SABLIER_BOB]: sablierBobAbi,
  [manifest.SABLIER_ESCROW]: sablierEscrowAbi,
  [manifest.SABLIER_LIDO_ADAPTER]: sablierLidoAdapterAbi,
} as const;
