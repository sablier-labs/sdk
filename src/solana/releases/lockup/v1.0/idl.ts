import { idl as SablierLockupLinearIDL } from "@src/solana/idl/lockup/v1.0/SablierLockupLinear/idl";
import type { Sablier } from "@src/types";
import manifest from "./manifest";

export const idl: Sablier.Solana.IdlMap = {
  [manifest.SABLIER_LOCKUP_LINEAR]: SablierLockupLinearIDL,
};
