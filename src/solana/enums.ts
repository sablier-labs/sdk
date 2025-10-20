export enum Protocol {
  Airdrops = "airdrops",
  Lockup = "lockup",
}

export namespace Version {
  export enum Airdrops {
    V1_0 = "v1.0",
  }

  export enum Lockup {
    V1_0 = "v1.0",
  }
}

export const enums = {
  Protocol,
  Version,
};
