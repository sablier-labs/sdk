import * as EVMTypes from "./evm/types";
import * as SolanaTypes from "./solana/types";

export namespace Sablier {
  export import EVM = EVMTypes.EVM;
  export import Solana = SolanaTypes.Solana;

  // Re-exporting for pre-v1.7 backward compatibility
  export import Address = EVM.Address;
  export import AbiMap = EVM.AbiMap;
  export import Chain = EVM.Chain;
  export import CompilerSettings = EVM.CompilerSettings;
  export import Contract = EVM.Contract;
  export import ContractCatalog = EVM.ContractCatalog;
  export import ContractMap = EVM.ContractMap;
  export import Deployment = EVM.Deployment;
  export import Manifest = EVM.Manifest;
  export import Protocol = EVM.Protocol;
  export import Release = EVM.Release;
  export import Version = EVM.Version;
}
