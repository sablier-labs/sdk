import { Protocol } from "@src/evm/enums";
import { releasesQueries } from "@src/evm/releases/queries";
import { createContractsQueries } from "@src/internal/factories/queries";
import type { Sablier } from "@src/types";
import { aliasCatalog } from "./alias-catalog";
import { catalog } from "./catalog";

export const contractsQueries = createContractsQueries<
  Sablier.EVM.Protocol,
  Sablier.EVM.Contract,
  Sablier.EVM.Deployment,
  Sablier.EVM.Release,
  Sablier.EVM.ContractCatalog,
  Sablier.EVM.AliasCatalog
>({
  aliasCatalog,
  catalog,
  contractsField: "contracts",
  normalizeAddress: (address) => address.toLowerCase(),
  protocols: [Protocol.Airdrops, Protocol.Flow, Protocol.Legacy, Protocol.Lockup],
  releasesQueries,
});
