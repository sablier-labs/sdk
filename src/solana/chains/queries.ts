import { createChainQueries } from "@/src/internal/factories/chains.js";
import type { Sablier } from "@/src/types.js";
import { solanaDevnet, solanaMainnetBeta } from "./chains.js";

export const chainsQueries = createChainQueries<Sablier.Solana.Chain>({
  solanaDevnet,
  solanaMainnetBeta,
});
