import { idl as SablierMerkleInstantIDL } from "@src/solana/idl/airdrops/v1.0/SablierMerkleInstant/idl";
import type { Sablier } from "@src/types";
import manifest from "./manifest";

export const idl: Sablier.Solana.IdlMap = {
  [manifest.SABLIER_MERKLE_INSTANT]: SablierMerkleInstantIDL,
};
