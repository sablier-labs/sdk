import { Protocol } from "@/src/evm/enums.js";
import { releasesQueries } from "@/src/evm/releases/queries.js";
import { createContractsQueries } from "@/src/internal/factories/queries.js";
import type { Sablier } from "@/src/types.js";
import { getAliasCatalog } from "./alias-catalog.js";
import { catalog } from "./catalog.js";

export const contractsQueries = createContractsQueries<
  Sablier.EVM.Protocol,
  Sablier.EVM.Contract,
  Sablier.EVM.Deployment,
  Sablier.EVM.Release,
  Sablier.EVM.ContractCatalog,
  Sablier.EVM.AliasCatalog
>({
  catalog,
  contractsField: "contracts",
  getAliasCatalog,
  protocols: [Protocol.Airdrops, Protocol.Flow, Protocol.Legacy, Protocol.Lockup],
  normalizeAddress: (address) => address.toLowerCase(),
  releasesQueries,
});
