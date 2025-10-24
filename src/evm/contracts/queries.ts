import { Protocol } from "@src/evm/enums";
import { releasesQueries } from "@src/evm/releases/queries";
import { createContractsQueries } from "@src/internal/query-factory";
import type { Sablier } from "@src/types";
import { catalog } from "./catalog";

export const contractsQueries = createContractsQueries<
  Sablier.EVM.Protocol,
  Sablier.EVM.Contract,
  Sablier.EVM.Release,
  Sablier.EVM.ContractCatalog
>({
  catalog,
  normalizeAddress: (address) => address.toLowerCase(),
  protocols: [Protocol.Airdrops, Protocol.Flow, Protocol.Legacy, Protocol.Lockup],
  releasesQueries,
});
