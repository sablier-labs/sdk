import type { Sablier } from "@src/types";
/**
 * @file Many of these are type definitions for the JSON structures that can be found
 *  under `./data`. These types represent the structure of broadcast and ZK broadcast
 * JSON files used in the deployment process.
 */

export type BasicContract = {
  address: Sablier.Address;
  name: string;
};

export type ContractReturn = {
  internal_type: string;
  value: `0x${string}`;
};

export type StandardBroadcast = {
  libraries: string[];
  returns: {
    [key: string]: ContractReturn;
  };
};

export type ZKBroadcast = {
  contractName: string;
  entries: Array<{
    address: Sablier.Address;
    salt: string;
  }>;
};
