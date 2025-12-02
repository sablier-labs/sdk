import { contracts } from "@src/evm/contracts";
import { Protocol } from "@src/evm/enums";
import { sablier } from "@src/sablier";
import type { Sablier } from "@src/types";
import axios from "axios";
import { describe, expect, it } from "vitest";
import { ETHERSCAN_CHAINS, getEtherscanContractCreationUrl } from "../helpers/etherscan";

interface EtherscanResponse {
  result?: Array<{
    blockNumber: string;
  }>;
}

/**
 * These contracts are indexed by the Sablier Indexers, so they require a deployment block number.
 * @see https://github.com/sablier-labs/indexers
 */
const INDEXED: Record<Sablier.EVM.Protocol, Set<string>> = {
  [Protocol.Airdrops]: new Set([
    contracts.names.SABLIER_MERKLE_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_LOCKUP_FACTORY,
    contracts.names.SABLIER_V2_MERKLE_STREAMER_FACTORY,
    contracts.names.SABLIER_FACTORY_MERKLE_INSTANT,
    contracts.names.SABLIER_FACTORY_MERKLE_LL,
    contracts.names.SABLIER_FACTORY_MERKLE_LT,
    contracts.names.SABLIER_FACTORY_MERKLE_VCA,
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

describe("Block numbers correspond to Etherscan data", () => {
  /**
   * Fetches contract creation block number from Etherscan API
   */
  async function getContractCreationBlock(
    address: string,
    chainId: number,
  ): Promise<number | undefined> {
    const addressLower = address.toLowerCase();
    const apiURL = getEtherscanContractCreationUrl({
      chainId,
      contractAddresses: addressLower,
    });

    const response = await axios.get<EtherscanResponse>(apiURL);
    const blockNumber = response.data.result?.[0]?.blockNumber;
    return blockNumber ? Number.parseInt(blockNumber, 10) : undefined;
  }

  for (const release of sablier.evm.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, async () => {
      const contracts = sablier.evm.contracts.getAll({ release })!;

      for (const contract of contracts) {
        if (!ETHERSCAN_CHAINS.has(contract.chainId)) {
          continue;
        }

        if (!INDEXED[release.protocol].has(contract.name)) {
          it.skip(`Skipped ${contract.name} because it's not an indexed contract.`, () => {});
          continue;
        }

        const chain = sablier.evm.chains.getOrThrow(contract.chainId);
        const actualBlockNumber = await getContractCreationBlock(contract.address, chain.id);
        if (!actualBlockNumber) {
          it.skip(`Skipped ${contract.name} because the block number could not be fetched from Etherscan.`, () => {});
          continue;
        }

        it(`Chain ${chain.name} - Contract ${contract.name} should have a correct block number`, () => {
          expect(contract.block).toEqual(actualBlockNumber);
        });
      }
    });
  }
});
