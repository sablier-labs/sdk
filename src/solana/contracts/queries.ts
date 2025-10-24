import { createContractsQueries } from "@src/internal/query-factory";
import { Protocol } from "@src/solana/enums";
import { releasesQueries } from "@src/solana/releases/queries";
import type { Sablier } from "@src/types";
import { catalog } from "./catalog";

export const contractsQueries = createContractsQueries<
  Sablier.Solana.Protocol,
  Sablier.Solana.Contract,
  Sablier.Solana.Release,
  Sablier.Solana.ContractCatalog
>({
  catalog,
  normalizeAddress: (address) => address, // Solana addresses are case-sensitive
  protocols: [Protocol.Airdrops, Protocol.Lockup],
  releasesQueries,
});
