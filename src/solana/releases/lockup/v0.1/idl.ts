import type { Sablier } from "@src/types";
import * as errors from "./idl/SablierLockupLinear/errors";
import { errorCodes } from "./idl/SablierLockupLinear/errors";
import { idl as SablierLockupLinearIDL } from "./idl/SablierLockupLinear/idl";
import * as idlType from "./idl/SablierLockupLinear/idl-type";
import * as structs from "./idl/SablierLockupLinear/structs";
import manifest from "./manifest";

export const sablierLockupLinear = { errorCodes, SablierLockupLinearIDL, structs };

export const idl: Sablier.Solana.IdlMap = { [manifest.SABLIER_LOCKUP_LINEAR]: SablierLockupLinearIDL };

export namespace SablierLockupLinear {
  export import IDL = idlType.IDL;
  export import ErrorNames = errors.ErrorNames;
}
