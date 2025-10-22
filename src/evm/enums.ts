/**
 * @file The types in {@link file://./types.ts} are generated from these enums.
 */
export enum Protocol {
  Airdrops = "airdrops",
  Flow = "flow",
  Legacy = "legacy",
  Lockup = "lockup",
}

export namespace Version {
  export enum Airdrops {
    V1_1 = "v1.1",
    V1_2 = "v1.2",
    V1_3 = "v1.3",
    V2_0 = "v2.0",
  }

  export enum Flow {
    V1_0 = "v1.0",
    V1_1 = "v1.1",
    V2_0 = "v2.0",
  }

  export enum Legacy {
    V1_0 = "v1.0",
    V1_1 = "v1.1",
  }

  export enum Lockup {
    V1_0 = "v1.0",
    V1_1 = "v1.1",
    V1_2 = "v1.2",
    V2_0 = "v2.0",
    V3_0 = "v3.0",
  }
}

export const enums = {
  Protocol,
  Version,
};
