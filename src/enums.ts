/**
 * @file The types in {@link file://./types.ts} are generated from these enums.
 */
export const Protocol = {
  Airdrops: "airdrops",
  Flow: "flow",
  Legacy: "legacy",
  Lockup: "lockup",
} as const;

export const Version = {
  Airdrops: {
    V1_1: "v1.1",
    V1_2: "v1.2",
    V1_3: "v1.3",
  },
  Flow: {
    V1_0: "v1.0",
    V1_1: "v1.1",
  },
  Legacy: {
    V1_0: "v1.0",
    V1_1: "v1.1",
  },
  Lockup: {
    V1_0: "v1.0",
    V1_1: "v1.1",
    V1_2: "v1.2",
    V2_0: "v2.0",
  },
} as const;
