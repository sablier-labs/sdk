import { createContractsQueries } from "@src/internal/factories/queries";
import { Protocol } from "@src/solana/enums";
import { releasesQueries } from "@src/solana/releases/queries";
import type { Sablier } from "@src/types";
import { catalog } from "./catalog";

export const programsQueries = createContractsQueries<
  Sablier.Solana.Protocol,
  Sablier.Solana.Program,
  Sablier.Solana.Deployment,
  Sablier.Solana.Release,
  Sablier.Solana.ProgramCatalog
>({
  catalog,
  contractsField: "programs",
  normalizeAddress: (address) => address, // Solana addresses are case-sensitive
  protocols: [Protocol.Airdrops, Protocol.Lockup],
  releasesQueries,
});
