import { SablierMerkleInstantV10IDL } from "@src/solana/idl/airdrops/v1.0";
import type { Sablier } from "@src/types";
import manifest from "./manifest";

export const idl: Sablier.Solana.IdlMap = {
  [manifest.SABLIER_MERKLE_INSTANT]: SablierMerkleInstantV10IDL,
};
