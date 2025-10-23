import { SablierLockupLinearV10IDL } from "@src/solana/idl/lockup/v1.0";
import type { Sablier } from "@src/types";
import manifest from "./manifest";

export const idl: Sablier.Solana.IdlMap = {
  [manifest.SABLIER_LOCKUP_LINEAR]: SablierLockupLinearV10IDL,
};
