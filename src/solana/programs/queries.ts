import { createContractsQueries } from "@src/internal/factories/queries.js";
import { Protocol } from "@src/solana/enums.js";
import { releasesQueries } from "@src/solana/releases/queries.js";
import type { Sablier } from "@src/types.js";
import { getAliasCatalog } from "./alias-catalog.js";
import { catalog } from "./catalog.js";

export const programsQueries = createContractsQueries<
  Sablier.Solana.Protocol,
  Sablier.Solana.Program,
  Sablier.Solana.Deployment,
  Sablier.Solana.Release,
  Sablier.Solana.ProgramCatalog,
  Sablier.Solana.AliasCatalog
>({
  catalog,
  contractsField: "programs",
  getAliasCatalog,
  normalizeAddress: (address) => address, // Solana addresses are case-sensitive
  protocols: [Protocol.Airdrops, Protocol.Lockup],
  releasesQueries,
});
