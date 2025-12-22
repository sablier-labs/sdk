import type { Sablier } from "@src/types";
/**
 * @file Many of these are type definitions for the JSON structures that can be found
 *  under `./data`. These types represent the structure of broadcast and ZK broadcast
 * JSON files used in the deployment process.
 */

export type BasicContract = {
  address: Sablier.EVM.Address;
  name: string;
};

type ContractReturn = {
  internal_type: string;
  value: `0x${string}`;
};

export type StandardBroadcast = {
  libraries: string[];
  receipts: TransactionReceipt[];
  returns: {
    [key: string]: ContractReturn;
  };
  transactions: Transaction[];
};

type Transaction = {
  contractAddress: `0x${string}`;
  contractName: string;
  hash: `0x${string}`;
  transactionType: "CREATE2" | "CREATE";
};

type TransactionReceipt = {
  blockNumber: `0x${string}`;
  contractAddress: `0x${string}` | null;
  transactionHash: `0x${string}`;
};

export type ZKBroadcast = {
  contractName: string;
  entries: Array<{
    address: Sablier.EVM.Address;
    deploymentType: "create2" | "create";
    salt: `0x${string}`;
    txHash: `0x${string}`;
  }>;
};
