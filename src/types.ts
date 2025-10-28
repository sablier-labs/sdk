import * as EVMTypes from "./evm/types";

export namespace Sablier {
  export import EVM = EVMTypes.EVM;

  /* -------------------------------------------------------------------------- */
  /*                           BACKWARD COMPATIBILITY                           */
  /* -------------------------------------------------------------------------- */
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
