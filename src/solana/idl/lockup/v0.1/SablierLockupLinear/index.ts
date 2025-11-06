/* -------------------------------------------------------------------------- */
/*                                   OBJECTS                                  */
/* -------------------------------------------------------------------------- */

import { errorCodes } from "./errors";
import { idl } from "./idl";
import * as structs from "./structs";

export const sablierLockupLinear = { errorCodes, idl, structs };

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

import * as errors from "./errors";
import * as idlType from "./idl-type";

export namespace SablierLockupLinear {
  export import IDL = idlType.IDL;
  export import ErrorNames = errors.ErrorNames;
}
