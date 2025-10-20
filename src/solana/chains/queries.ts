import { createChainQueries } from "@src/internal/factories/chains";
import type { Sablier } from "@src/types";
import * as chains from "./data";

export const chainsQueries = createChainQueries<Sablier.Solana.Chain>(chains);
