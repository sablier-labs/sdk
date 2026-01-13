import type { Sablier } from "@src/types.js";
import * as errors from "./idl/SablierMerkleInstant/errors.js";
import { errorCodes } from "./idl/SablierMerkleInstant/errors.js";
import { idl as SablierMerkleInstantIDL } from "./idl/SablierMerkleInstant/idl.js";
import * as idlType from "./idl/SablierMerkleInstant/idl-type.js";
import * as structs from "./idl/SablierMerkleInstant/structs.js";
import manifest from "./manifest.js";

export const sablierMerkleInstant = { errorCodes, SablierMerkleInstantIDL, structs };

export const idl: Sablier.Solana.IdlMap = {
  [manifest.SABLIER_MERKLE_INSTANT]: SablierMerkleInstantIDL,
};

export namespace SablierMerkleInstant {
  export import IDL = idlType.IDL;
  export import ErrorNames = errors.ErrorNames;
}
