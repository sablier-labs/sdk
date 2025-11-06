export enum ChainCode {
  mainnet = "SOL",
  devnet = "SOLDEV",
  testnet = "SOLTEST",
}
export enum Cluster {
  mainnet = "mainnet-beta",
  devnet = "devnet",
  testnet = "testnet",
}

export enum Protocol {
  Airdrops = "airdrops",
  Lockup = "lockup",
}

export namespace Version {
  export enum Airdrops {
    V0_1 = "v0.1",
  }

  export enum Lockup {
    V0_1 = "v0.1",
  }
}

export const enums = {
  ChainCode,
  Cluster,
  Protocol,
  Version,
};
