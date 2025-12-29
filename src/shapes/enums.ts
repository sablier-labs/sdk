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
