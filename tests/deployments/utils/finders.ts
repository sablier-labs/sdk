import _ from "lodash";
import type { BasicContract, StandardBroadcast, ZKBroadcast } from "../../types";

const CONTRACT_PREFIX = "contract ";

/**
 * Finds a contract in the broadcast data.
 */
export function findContract(data: StandardBroadcast, contractName: string): BasicContract | null {
  const contractFromReturns = findInReturns(data, contractName);
  if (contractFromReturns) return contractFromReturns;

  // Check in libraries
  const contractFromLibraries = findInLibraries(data, contractName);
  if (contractFromLibraries) return contractFromLibraries;

  return null;
}

export function findZKContract(zkData: ZKBroadcast[], contractName: string): ZKBroadcast | null {
  return _.find(zkData, { contractName }) ?? null;
}

/**
 * Finds a contract in the returns data
 * @example
 * "returns": {
 *  "lockup": {
 *    "internal_type": "contract SablierLockup",
 *    "value": "0x7C01AA3783577E15fD7e272443D44B92d5b21056"
 *  }
 * }
 */
function findInReturns(data: StandardBroadcast, contractName: string): BasicContract | null {
  if (!data.returns) {
    return null;
  }

  for (const contractReturn of _.values(data.returns)) {
    const sanitizedName = contractReturn.internal_type.replace(CONTRACT_PREFIX, "");
    if (contractName === sanitizedName) {
      return { address: contractReturn.value, name: contractName };
    }
  }

  return null;
}

/**
 * Finds a contract in the libraries data
 * @example
 * "libraries": [
 *   "src/libraries/Helpers.sol:Helpers:0xf8076E4Fb5cfE8be1C26E61222DC51828Db8C1dc"
 * ]
 */
function findInLibraries(data: StandardBroadcast, contractName: string): BasicContract | null {
  if (!data.libraries) {
    return null;
  }

  for (const library of data.libraries) {
    // Ensure we have the format "path/to/file.sol:ContractName:0xAddress"
    const parts = library.split(":");
    if (parts.length !== 3) continue;

    const libraryName = parts[1];
    const libraryAddress = parts[2] as `0x${string}`;

    if (contractName === libraryName) {
      return { address: libraryAddress, name: contractName };
    }
  }
  return null;
}
