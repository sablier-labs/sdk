export namespace Shape {
  export enum Lockup {
    Linear = "linear",
    Cliff = "cliff",
    DynamicCliffExponential = "dynamicCliffExponential",
    DynamicExponential = "dynamicExponential",
    Backweighted = "backweighted",
    Stepper = "stepper",
    Monthly = "monthly",
    Timelock = "timelock",
    UnlockLinear = "unlockLinear",
    UnlockCliff = "unlockCliff",
    DoubleUnlock = "doubleUnlock",
  }

  export enum Flow {
    Flow = "flow",
  }

  export enum Airdrops {
    Instant = "instant",
    Linear = "linear",
    Cliff = "cliff",
    UnlockLinear = "unlockLinear",
    UnlockCliff = "unlockCliff",
    Stepper = "stepper",
  }
}
