import type { Sablier } from "@/src/types.js";
import * as errors from "./idl/SablierLockupLinear/errors.js";
import { errorCodes } from "./idl/SablierLockupLinear/errors.js";
import { idl as SablierLockupLinearIDL } from "./idl/SablierLockupLinear/idl.js";
import * as idlType from "./idl/SablierLockupLinear/idl-type.js";
import * as structs from "./idl/SablierLockupLinear/structs.js";
import manifest from "./manifest.js";

export const sablierLockupLinear = { errorCodes, SablierLockupLinearIDL, structs };

export const idl: Sablier.Solana.IdlMap = {
  [manifest.SABLIER_LOCKUP_LINEAR]: SablierLockupLinearIDL,
};

export namespace SablierLockupLinear {
  export import IDL = idlType.IDL;
  export import ErrorNames = errors.ErrorNames;
}
