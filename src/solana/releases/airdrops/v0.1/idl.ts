import type { Sablier } from "@src/types";
import * as errors from "./idl/SablierMerkleInstant/errors";
import { errorCodes } from "./idl/SablierMerkleInstant/errors";
import { idl as SablierMerkleInstantIDL } from "./idl/SablierMerkleInstant/idl";
import * as idlType from "./idl/SablierMerkleInstant/idl-type";
import * as structs from "./idl/SablierMerkleInstant/structs";
import manifest from "./manifest";

export const sablierMerkleInstant = { errorCodes, SablierMerkleInstantIDL, structs };

export const idl: Sablier.Solana.IdlMap = { [manifest.SABLIER_MERKLE_INSTANT]: SablierMerkleInstantIDL };

export namespace SablierMerkleInstant {
  export import IDL = idlType.IDL;
  export import ErrorNames = errors.ErrorNames;
}
