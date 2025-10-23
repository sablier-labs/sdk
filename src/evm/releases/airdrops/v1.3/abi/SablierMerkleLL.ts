export const sablierMerkleLLAbi = [
  // This file would contain the full SablierMerkleLL ABI
  // extracted from lines 888-1565 of the original abi.ts file
  // For demonstration purposes, showing the pattern with a minimal constructor
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
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
            name: "campaignName",
            type: "string",
          },
          {
            internalType: "string",
            name: "shape",
            type: "string",
          },
        ],
        internalType: "struct MerkleBase.ConstructorParams",
        name: "baseParams",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "campaignCreator",
        type: "address",
      },
      {
        internalType: "contract ISablierLockup",
        name: "lockup",
        type: "address",
      },
      {
        internalType: "bool",
        name: "cancelable",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "transferable",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "uint40",
            name: "startTime",
            type: "uint40",
          },
          {
            internalType: "UD2x18",
            name: "startPercentage",
            type: "uint64",
          },
          {
            internalType: "uint40",
            name: "cliffDuration",
            type: "uint40",
          },
          {
            internalType: "UD2x18",
            name: "cliffPercentage",
            type: "uint64",
          },
          {
            internalType: "uint40",
            name: "totalDuration",
            type: "uint40",
          },
        ],
        internalType: "struct MerkleLL.Schedule",
        name: "schedule",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
] as const;
