export namespace Shape {
  export enum Lockup {
    Linear = "linear",
    Cliff = "cliff",
    DynamicCliffExponential = "dynamicCliffExponential",
    DynamicExponential = "dynamicExponential",
    TranchedBackweighted = "tranchedBackweighted",
    TranchedStepper = "tranchedStepper",
    TranchedMonthly = "tranchedMonthly",
    TranchedTimelock = "tranchedTimelock",
    LinearUnlockLinear = "linearUnlockLinear",
    LinearUnlockCliff = "linearUnlockCliff",
    LinearTimelock = "linearTimelock",
    DynamicTimelock = "dynamicTimelock",
    DynamicMonthly = "dynamicMonthly",
    DynamicStepper = "dynamicStepper",
    DynamicUnlockCliff = "dynamicUnlockCliff",
    DynamicUnlockLinear = "dynamicUnlockLinear",
    DynamicDoubleUnlock = "dynamicDoubleUnlock",
  }

  export enum Flow {
    Flow = "flow",
  }

  export enum Airdrops {
    Instant = "instant",
    Linear = "linear",
    Cliff = "cliff",
    LinearUnlockLinear = "linearUnlockLinear",
    LinearUnlockCliff = "linearUnlockCliff",
    TranchedStepper = "tranchedStepper",
  }
}
