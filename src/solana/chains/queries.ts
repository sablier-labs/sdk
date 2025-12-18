import { createChainQueries } from "@src/internal/factories/chains";
import type { Sablier } from "@src/types";
import { solanaDevnet, solanaMainnetBeta } from "./data";

export const chainsQueries = createChainQueries<Sablier.Solana.Chain>({
  solanaDevnet,
  solanaMainnetBeta,
});
