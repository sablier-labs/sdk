export const sablierV2MerkleLTAbi = [
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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ASSET",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CANCELABLE",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EXPIRATION",
    outputs: [
      {
        internalType: "uint40",
        name: "",
        type: "uint40",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TRANCHED",
    outputs: [
      {
        internalType: "contract ISablierV2LockupTranched",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MERKLE_ROOT",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOTAL_PERCENTAGE",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRANSFERABLE",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "bytes32[]",
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "clawback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFirstClaimTime",
    outputs: [
      {
        internalType: "uint40",
        name: "",
        type: "uint40",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTranchesWithPercentages",
    outputs: [
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
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "hasClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasExpired",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ipfsCID",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "transferAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "streamId",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "Clawback",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "TransferAdmin",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "CallerNotAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "PRBMath_MulDiv18_Overflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "UD60x18",
        name: "x",
        type: "uint256",
      },
    ],
    name: "PRBMath_UD60x18_IntoUint128_Overflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "totalPercentage",
        type: "uint64",
      },
    ],
    name: "SablierV2MerkleLT_TotalPercentageNotOneHundred",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint40",
        name: "expiration",
        type: "uint40",
      },
    ],
    name: "SablierV2MerkleLockup_CampaignExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nameLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxLength",
        type: "uint256",
      },
    ],
    name: "SablierV2MerkleLockup_CampaignNameTooLong",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint40",
        name: "expiration",
        type: "uint40",
      },
      {
        internalType: "uint40",
        name: "firstClaimTime",
        type: "uint40",
      },
    ],
    name: "SablierV2MerkleLockup_ClawbackNotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "SablierV2MerkleLockup_InvalidProof",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "SablierV2MerkleLockup_StreamClaimed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
] as const;
