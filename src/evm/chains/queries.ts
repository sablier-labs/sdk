import { createChainQueries } from "@/src/internal/factories/chains.js";
import type { Sablier } from "@/src/types.js";
import * as chains from "./chains.js";

export const chainsQueries = createChainQueries<Sablier.EVM.Chain>(chains);
