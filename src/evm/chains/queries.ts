import { createChainQueries } from "@src/internal/factories/chains";
import type { Sablier } from "@src/types";
import * as chains from "./chains";

export const chainsQueries = createChainQueries<Sablier.EVM.Chain>(chains);
