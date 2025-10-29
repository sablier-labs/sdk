export const sablierV2MerkleLockupFactoryAbi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "uint40",
            name: "expiration",
            type: "uint40",
          },
          {
            internalType: "address",
            name: "initialAdmin",
            type: "address",
          },
          {
            internalType: "string",
            name: "ipfsCID",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "bool",
            name: "transferable",
            type: "bool",
          },
        ],
        internalType: "struct MerkleLockup.ConstructorParams",
        name: "baseParams",
        type: "tuple",
      },
      {
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint40",
            name: "cliff",
            type: "uint40",
          },
          {
            internalType: "uint40",
            name: "total",
            type: "uint40",
          },
        ],
        internalType: "struct LockupLinear.Durations",
        name: "streamDurations",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "aggregateAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "recipientCount",
        type: "uint256",
      },
    ],
    name: "createMerkleLL",
    outputs: [
      {
        internalType: "contract ISablierV2MerkleLL",
        name: "merkleLL",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "uint40",
            name: "expiration",
            type: "uint40",
          },
          {
            internalType: "address",
            name: "initialAdmin",
            type: "address",
          },
          {
            internalType: "string",
            name: "ipfsCID",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "bool",
            name: "transferable",
            type: "bool",
          },
        ],
        internalType: "struct MerkleLockup.ConstructorParams",
        name: "baseParams",
        type: "tuple",
      },
      {
        internalType: "contract ISablierV2LockupTranched",
        name: "lockupTranched",
        type: "address",
      },
      {
        components: [
          {
            internalType: "UD2x18",
            name: "unlockPercentage",
            type: "uint64",
          },
          {
            internalType: "uint40",
            name: "duration",
            type: "uint40",
          },
        ],
        internalType: "struct MerkleLT.TrancheWithPercentage[]",
        name: "tranchesWithPercentages",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "aggregateAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "recipientCount",
        type: "uint256",
      },
    ],
    name: "createMerkleLT",
    outputs: [
      {
        internalType: "contract ISablierV2MerkleLT",
        name: "merkleLT",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "UD2x18",
            name: "unlockPercentage",
            type: "uint64",
          },
          {
            internalType: "uint40",
            name: "duration",
            type: "uint40",
          },
        ],
        internalType: "struct MerkleLT.TrancheWithPercentage[]",
        name: "tranches",
        type: "tuple[]",
      },
    ],
    name: "isPercentagesSum100",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISablierV2MerkleLL",
        name: "merkleLL",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "uint40",
            name: "expiration",
            type: "uint40",
          },
          {
            internalType: "address",
            name: "initialAdmin",
            type: "address",
          },
          {
            internalType: "string",
            name: "ipfsCID",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "bool",
            name: "transferable",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct MerkleLockup.ConstructorParams",
        name: "baseParams",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "contract ISablierV2LockupLinear",
        name: "lockupLinear",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint40",
            name: "cliff",
            type: "uint40",
          },
          {
            internalType: "uint40",
            name: "total",
            type: "uint40",
          },
        ],
        indexed: false,
        internalType: "struct LockupLinear.Durations",
        name: "streamDurations",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "aggregateAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "recipientCount",
        type: "uint256",
      },
    ],
    name: "CreateMerkleLL",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ISablierV2MerkleLT",
        name: "merkleLT",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "bool",
            name: "cancelable",
            type: "bool",
          },
          {
            internalType: "uint40",
            name: "expiration",
            type: "uint40",
          },
          {
            internalType: "address",
            name: "initialAdmin",
            type: "address",
          },
          {
            internalType: "string",
            name: "ipfsCID",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "bool",
            name: "transferable",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct MerkleLockup.ConstructorParams",
        name: "baseParams",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "contract ISablierV2LockupTranched",
        name: "lockupTranched",
        type: "address",
      },
      {
        components: [
          {
            internalType: "UD2x18",
            name: "unlockPercentage",
            type: "uint64",
          },
          {
            internalType: "uint40",
            name: "duration",
            type: "uint40",
          },
        ],
        indexed: false,
        internalType: "struct MerkleLT.TrancheWithPercentage[]",
        name: "tranchesWithPercentages",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDuration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "aggregateAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "recipientCount",
        type: "uint256",
      },
    ],
    name: "CreateMerkleLT",
    type: "event",
  },
] as const;
