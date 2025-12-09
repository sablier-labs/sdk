import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { beforeAll, describe, expect, it } from "@effect/vitest";
import { contracts } from "@src/evm/contracts";
import { Protocol } from "@src/evm/enums";
import { sablier } from "@src/sablier";
import type { Sablier } from "@src/types";
import { Effect, Schema } from "effect";
import { ETHERSCAN_CHAINS, getEtherscanContractCreationUrl } from "../helpers/etherscan";

/** Cache of chainId:address -> block number (undefined if fetch failed) */
const blockNumberCache = new Map<string, number | undefined>();

/** Creates a cache key from chainId and address */
const cacheKey = (chainId: number, address: string) => `${chainId}:${address.toLowerCase()}`;

const EtherscanResultSchema = Schema.Struct({
  blockNumber: Schema.String,
});

const EtherscanResponseSchema = Schema.Union(
  Schema.Struct({
    result: Schema.Array(EtherscanResultSchema),
  }),
  // Error response
  Schema.Struct({
    result: Schema.String,
  }),
);

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

/**
 * Fetches contract creation block number from Etherscan API
 */
function getContractCreationBlock(address: string, chainId: number) {
  return Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const addressLower = address.toLowerCase();
    const apiURL = getEtherscanContractCreationUrl({
      chainId,
      contractAddresses: addressLower,
    });

    const request = HttpClientRequest.get(apiURL);
    const response = yield* client.execute(request);
    const body = yield* HttpClientResponse.schemaBodyJson(EtherscanResponseSchema)(response);

    // Handle case where result is an error string
    if (typeof body.result === "string") {
      return undefined;
    }

    // Handle case where result is an array
    const blockNumberStr = body.result?.[0]?.blockNumber;
    if (!blockNumberStr) {
      return undefined;
    }

    const blockNumber = Number.parseInt(blockNumberStr, 10);
    return blockNumber;
  }).pipe(Effect.provide(FetchHttpClient.layer));
}

describe("Block numbers correspond to Etherscan data", () => {
  // Pre-fetch all block numbers before running tests
  beforeAll(async () => {
    const effects: Effect.Effect<void>[] = [];

    for (const release of sablier.evm.releases.getAll()) {
      const releaseContracts = sablier.evm.contracts.getAll({ release })!;
      for (const contract of releaseContracts) {
        if (!ETHERSCAN_CHAINS.has(contract.chainId)) continue;
        if (!INDEXED[release.protocol].has(contract.name)) continue;

        effects.push(
          getContractCreationBlock(contract.address, contract.chainId).pipe(
            Effect.tap((blockNumber) => {
              blockNumberCache.set(cacheKey(contract.chainId, contract.address), blockNumber);
            }),
            Effect.ignore,
          ),
        );
      }
    }

    await Effect.runPromise(Effect.all(effects, { concurrency: "unbounded" }));
  });

  for (const release of sablier.evm.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
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
        const key = cacheKey(contract.chainId, contract.address);
        const shouldSkip = () =>
          !blockNumberCache.has(key) || blockNumberCache.get(key) === undefined;

        it.effect.skipIf(shouldSkip)(
          `Chain ${chain.name} - Contract ${contract.name} should have a correct block number`,
          () =>
            Effect.sync(() => {
              const actualBlockNumber = blockNumberCache.get(key);
              expect(contract.block).toBe(actualBlockNumber);
            }),
        );
      }
    });
  }
});
