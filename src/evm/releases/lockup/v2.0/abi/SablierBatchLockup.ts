export const sablierBatchLockupAbi = [
  {
    inputs: [
      { internalType: "contract ISablierLockup", name: "lockup", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          { internalType: "bool", name: "transferable", type: "bool" },
          {
            components: [
              { internalType: "uint128", name: "amount", type: "uint128" },
              { internalType: "UD2x18", name: "exponent", type: "uint64" },
              { internalType: "uint40", name: "duration", type: "uint40" },
            ],
            internalType: "struct LockupDynamic.SegmentWithDuration[]",
            name: "segmentsWithDuration",
            type: "tuple[]",
          },
          { internalType: "string", name: "shape", type: "string" },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct BatchLockup.CreateWithDurationsLD[]",
        name: "batch",
        type: "tuple[]",
      },
    ],
    name: "createWithDurationsLD",
    outputs: [{ internalType: "uint256[]", name: "streamIds", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISablierLockup", name: "lockup", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          { internalType: "bool", name: "transferable", type: "bool" },
          {
            components: [
              { internalType: "uint40", name: "cliff", type: "uint40" },
              { internalType: "uint40", name: "total", type: "uint40" },
            ],
            internalType: "struct LockupLinear.Durations",
            name: "durations",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint128", name: "start", type: "uint128" },
              { internalType: "uint128", name: "cliff", type: "uint128" },
            ],
            internalType: "struct LockupLinear.UnlockAmounts",
            name: "unlockAmounts",
            type: "tuple",
          },
          { internalType: "string", name: "shape", type: "string" },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct BatchLockup.CreateWithDurationsLL[]",
        name: "batch",
        type: "tuple[]",
      },
    ],
    name: "createWithDurationsLL",
    outputs: [{ internalType: "uint256[]", name: "streamIds", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISablierLockup", name: "lockup", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          { internalType: "bool", name: "transferable", type: "bool" },
          {
            components: [
              { internalType: "uint128", name: "amount", type: "uint128" },
              { internalType: "uint40", name: "duration", type: "uint40" },
            ],
            internalType: "struct LockupTranched.TrancheWithDuration[]",
            name: "tranchesWithDuration",
            type: "tuple[]",
          },
          { internalType: "string", name: "shape", type: "string" },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct BatchLockup.CreateWithDurationsLT[]",
        name: "batch",
        type: "tuple[]",
      },
    ],
    name: "createWithDurationsLT",
    outputs: [{ internalType: "uint256[]", name: "streamIds", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISablierLockup", name: "lockup", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          { internalType: "bool", name: "transferable", type: "bool" },
          { internalType: "uint40", name: "startTime", type: "uint40" },
          {
            components: [
              { internalType: "uint128", name: "amount", type: "uint128" },
              { internalType: "UD2x18", name: "exponent", type: "uint64" },
              { internalType: "uint40", name: "timestamp", type: "uint40" },
            ],
            internalType: "struct LockupDynamic.Segment[]",
            name: "segments",
            type: "tuple[]",
          },
          { internalType: "string", name: "shape", type: "string" },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct BatchLockup.CreateWithTimestampsLD[]",
        name: "batch",
        type: "tuple[]",
      },
    ],
    name: "createWithTimestampsLD",
    outputs: [{ internalType: "uint256[]", name: "streamIds", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISablierLockup", name: "lockup", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          { internalType: "bool", name: "transferable", type: "bool" },
          {
            components: [
              { internalType: "uint40", name: "start", type: "uint40" },
              { internalType: "uint40", name: "end", type: "uint40" },
            ],
            internalType: "struct Lockup.Timestamps",
            name: "timestamps",
            type: "tuple",
          },
          { internalType: "uint40", name: "cliffTime", type: "uint40" },
          {
            components: [
              { internalType: "uint128", name: "start", type: "uint128" },
              { internalType: "uint128", name: "cliff", type: "uint128" },
            ],
            internalType: "struct LockupLinear.UnlockAmounts",
            name: "unlockAmounts",
            type: "tuple",
          },
          { internalType: "string", name: "shape", type: "string" },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct BatchLockup.CreateWithTimestampsLL[]",
        name: "batch",
        type: "tuple[]",
      },
    ],
    name: "createWithTimestampsLL",
    outputs: [{ internalType: "uint256[]", name: "streamIds", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ISablierLockup", name: "lockup", type: "address" },
      { internalType: "contract IERC20", name: "token", type: "address" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "totalAmount", type: "uint128" },
          { internalType: "bool", name: "cancelable", type: "bool" },
          { internalType: "bool", name: "transferable", type: "bool" },
          { internalType: "uint40", name: "startTime", type: "uint40" },
          {
            components: [
              { internalType: "uint128", name: "amount", type: "uint128" },
              { internalType: "uint40", name: "timestamp", type: "uint40" },
            ],
            internalType: "struct LockupTranched.Tranche[]",
            name: "tranches",
            type: "tuple[]",
          },
          { internalType: "string", name: "shape", type: "string" },
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "UD60x18", name: "fee", type: "uint256" },
            ],
            internalType: "struct Broker",
            name: "broker",
            type: "tuple",
          },
        ],
        internalType: "struct BatchLockup.CreateWithTimestampsLT[]",
        name: "batch",
        type: "tuple[]",
      },
    ],
    name: "createWithTimestampsLT",
    outputs: [{ internalType: "uint256[]", name: "streamIds", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "SablierBatchLockup_BatchSizeZero", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
] as const;
