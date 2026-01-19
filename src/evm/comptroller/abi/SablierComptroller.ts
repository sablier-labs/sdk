export const sablierComptrollerAbi = [
  {
    inputs: [
      { internalType: "address[]", name: "protocolAddresses", type: "address[]" },
      { internalType: "address", name: "feeRecipient", type: "address" },
    ],
    name: "transferFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
