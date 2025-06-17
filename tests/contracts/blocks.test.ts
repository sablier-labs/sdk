import { contracts } from "@src/contracts";
import { Protocol } from "@src/enums";
import { sablier } from "@src/sablier";
import type { Sablier } from "@src/types";
import axios from "axios";
import _ from "lodash";
import { describe, expect, it } from "vitest";
import { ETHERSCAN_CHAINS, getEtherscanContractCreationUrl } from "../helpers/etherscan";

/**
 * These contracts are indexed by the Sablier Indexers, so they require a deployment block number.
 * @see https://github.com/sablier-labs/indexers
 */
const INDEXED: Record<Sablier.Protocol, Set<string>> = {
  [Protocol.Airdrops]: new Set([
    contracts.names.SABLIER_MERKLE_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_LOCKUP_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_STREAMER_FACTORY,
  ]),
  [Protocol.Flow]: new Set([contracts.names.SABLIER_FLOW]),
  [Protocol.Legacy]: new Set(),
  [Protocol.Lockup]: new Set([
    contracts.names.SABLIER_V2_LOCKUP_LINEAR,
    contracts.names.SABLIER_V2_LOCKUP_DYNAMIC,
    contracts.names.SABLIER_V2_LOCKUP_TRANCHED,
    contracts.names.SABLIER_LOCKUP,
  ]),
};

describe("Indexed contracts have a deployment block number", () => {
  for (const release of sablier.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const contracts = sablier.contracts.getAll({ release })!;

      for (const contract of contracts) {
        if (!INDEXED[release.protocol].has(contract.name)) {
          it.skip(`Skipped ${contract.name} because it's not an indexed contract.`, () => {});
          continue;
        }

        const chain = sablier.chains.getOrThrow(contract.chainId);
        it(`Contract ${contract.name} should have a deployment block number set on ${chain.name}`, () => {
          const errorMsg = `No block number found for ${contract.name}`;
          expect(contract.block, errorMsg).toBeDefined();
        });
      }
    });
  }
});

const envVarsSet = Boolean(process.env.CI && process.env.VITE_CONTRACT_BLOCKS_TESTS);

describe.runIf(envVarsSet)("Block numbers correspond to Etherscan data", () => {
  const ETHERSCAN_API_KEY = process.env.VITE_ETHERSCAN_API_KEY;
  if (!ETHERSCAN_API_KEY) {
    throw new Error("VITE_ETHERSCAN_API_KEY is not set");
  }

  /**
   * Fetches contract creation block number from Etherscan API
   */
  async function getContractCreationBlock(address: string, chainId: number): Promise<number | undefined> {
    const addressLower = address.toLowerCase();
    const apiURL = getEtherscanContractCreationUrl({
      chainId,
      contractAddresses: addressLower,
    });

    const response = await axios.get(apiURL);
    const blockNumber = _.get(response.data, "result[0].blockNumber");
    return blockNumber ? Number.parseInt(blockNumber, 10) : undefined;
  }

  for (const release of sablier.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const contracts = sablier.contracts.getAll({ release })!;

      for (const contract of contracts) {
        if (!ETHERSCAN_CHAINS.has(contract.chainId)) {
          continue;
        }

        if (!INDEXED[release.protocol].has(contract.name)) {
          it.skip(`Skipped ${contract.name} because it's not an indexed contract.`, () => {});
          continue;
        }

        const chain = sablier.chains.getOrThrow(contract.chainId);
        it(`Contract ${contract.name} should have a correct block number on ${chain.name}`, async () => {
          const actualBlockNumber = await getContractCreationBlock(contract.address, chain.id);
          expect(contract.block).toEqual(actualBlockNumber);
        });
      }
    });
  }
});
