/**
 * @file This test suite ensures consistency between chain definitions in the package and deployment files.
 *
 * The tests verify that:
 * 1. All chains defined in the package have corresponding deployment files
 * 2. All deployment files correspond to chains defined in the package
 *
 * The test searches through deployment directories for files and compares them against the chains
 * defined in the package.
 *
 * Additionally, it pings the public JSON-RPC servers of all chains to ensure they are reachable.
 */
import path from "node:path";
import { chains } from "@src/evm/chains";
import { getDeploymentsDir } from "@src/internal/helpers";
import globby from "globby";
import _ from "lodash";
import { beforeAll, describe, expect, it } from "vitest";
import { MISSING_CHAINS } from "./helpers/missing";
import { testRPCEndpoint } from "./helpers/verify-chains";

const KNOWN_SLUGS = _.values(chains)
  .filter((chain) => !MISSING_CHAINS.includes(chain.id))
  .map((chain) => chain.slug);

describe("Package chains are in sync with broadcasts", () => {
  let broadcastSlugs: string[] = [];
  const errors: Set<string> = new Set();

  beforeAll(async () => {
    // Get all deployment files
    broadcastSlugs = await getAllBroadcastSlugs();
  });

  it("should have every package chain in at least one broadcast", () => {
    errors.clear();
    const missingChains = _.difference(KNOWN_SLUGS, broadcastSlugs);

    for (const slug of missingChains) {
      errors.add(`Chain "${slug}" is defined in package but NOT found in any broadcast`);
    }

    if (errors.size > 0) {
      const msg = `❌ Missing chains:\n${[...errors].map((e) => `  🔍 ${e}`).join("\n")}`;
      throw new Error(msg);
    }
    expect(errors.size).toBe(0);
  });

  it("should not have any unknown chain in broadcasts", () => {
    errors.clear();
    const allowedSlugs = [...KNOWN_SLUGS, ...MISSING_CHAINS];
    const extraChains = _.difference(broadcastSlugs, allowedSlugs);

    for (const slug of extraChains) {
      errors.add(`Chain "${slug}" found in broadcasts but NOT defined in package`);
    }

    if (errors.size > 0) {
      const msg = `❌ Extra chains:\n${[...errors].map((e) => `  ⚠️ ${e}`).join("\n")}`;
      throw new Error(msg);
    }
    expect(errors.size).toBe(0);
  });
});

async function getAllBroadcastSlugs(): Promise<string[]> {
  const deploymentsPath = getDeploymentsDir();
  const dirs = await globby(
    [path.join(deploymentsPath, "**/broadcasts"), path.join(deploymentsPath, "**/broadcasts-zk")],
    {
      onlyDirectories: true,
    },
  );
  const results: string[] = [];

  for (const dir of dirs) {
    const entries = await globby(["*"], { cwd: dir, objectMode: true, onlyFiles: false });

    for (const entry of entries) {
      // It's a JSON file, use the basename without extension
      if (entry.path.endsWith(".json")) {
        results.push(path.basename(entry.path, ".json"));
      }
      // It's a directory, add its name
      else if (entry.dirent.isDirectory()) {
        results.push(entry.path);
      }
    }
  }

  return results;
}

// Import the internal chain objects from viem (these have the .id property)
import {
  arbitrum as _arbitrum,
  arbitrumSepolia as _arbitrumSepolia,
  avalanche as _avalanche,
  base as _base,
  baseSepolia as _baseSepolia,
  berachain as _berachain,
  blast as _blast,
  blastSepolia as _blastSepolia,
  bsc as _bsc,
  gnosis as _gnosis,
  linea as _linea,
  lineaSepolia as _lineaSepolia,
  mainnet as _mainnet,
  optimism as _optimism,
  optimismSepolia as _optimismSepolia,
  polygon as _polygon,
  ronin as _ronin,
  scroll as _scroll,
  sei as _sei,
  sepolia as _sepolia,
  sonic as _sonic,
  superseed as _superseed,
  unichain as _unichain,
  zksync as _zksync,
} from "viem/chains";

const alchemySupportedChains = [
  _arbitrum,
  _avalanche,
  _base,
  _baseSepolia,
  _berachain,
  _blast,
  _blastSepolia,
  _bsc,
  _gnosis,
  _linea,
  _lineaSepolia,
  _mainnet,
  _optimism,
  _optimismSepolia,
  _polygon,
  _ronin,
  _sepolia,
  _scroll,
  _sei,
  _sonic,
  _superseed,
  _unichain,
  _zksync,
];

const infuraSupportedChains = [
  _arbitrum,
  _arbitrumSepolia,
  _avalanche,
  _base,
  _baseSepolia,
  _blast,
  _blastSepolia,
  _bsc,
  _mainnet,
  _linea,
  _lineaSepolia,
  _optimism,
  _optimismSepolia,
  _polygon,
  _scroll,
  _sepolia,
  _unichain,
  _zksync,
];

describe("Chain Definitions Coverage", () => {
  it("should have definitions for all Alchemy-supported chains", () => {
    const exportedChains = Object.values(chains).filter(
      (value) => typeof value === "object" && value !== null && "id" in value,
    );

    const exportedChainIds = new Set(exportedChains.map((chain: any) => chain.id));

    const missingChains = alchemySupportedChains.filter((chain) => !exportedChainIds.has(chain.id));

    if (missingChains.length > 0) {
      const missingNames = missingChains.map((chain) => `${chain.name} (ID: ${chain.id})`);
      throw new Error(`Missing definitions for Alchemy-supported chains:\n${missingNames.join("\n")}`);
    }

    expect(missingChains).toHaveLength(0);
  });

  it("should have definitions for all Infura-supported chains", () => {
    const exportedChains = Object.values(chains).filter(
      (value) => typeof value === "object" && value !== null && "id" in value,
    );

    const exportedChainIds = new Set(exportedChains.map((chain: any) => chain.id));

    const missingChains = infuraSupportedChains.filter((chain) => !exportedChainIds.has(chain.id));

    if (missingChains.length > 0) {
      const missingNames = missingChains.map((chain) => `${chain.name} (ID: ${chain.id})`);
      throw new Error(`Missing definitions for Infura-supported chains:\n${missingNames.join("\n")}`);
    }

    expect(missingChains).toHaveLength(0);
  });

  it("should have RPC configurations for Alchemy-supported chains", () => {
    const chainsWithAlchemy = alchemySupportedChains.map((viemChain) => {
      const exportedChain = Object.values(chains).find((c: any) => c?.id === viemChain.id) as any;

      return {
        hasAlchemyRPC: exportedChain?.rpc?.alchemy !== undefined,
        id: viemChain.id,
        name: viemChain.name,
      };
    });

    const missingRPCs = chainsWithAlchemy.filter((c) => !c.hasAlchemyRPC);

    if (missingRPCs.length > 0) {
      const missingNames = missingRPCs.map((chain) => `${chain.name} (ID: ${chain.id})`);
      throw new Error(`Missing Alchemy RPC configurations for:\n${missingNames.join("\n")}`);
    }

    expect(missingRPCs).toHaveLength(0);
  });

  it("should have RPC configurations for Infura-supported chains", () => {
    const chainsWithInfura = infuraSupportedChains.map((viemChain) => {
      const exportedChain = Object.values(chains).find((c: any) => c?.id === viemChain.id) as any;

      return {
        hasInfuraRPC: exportedChain?.rpc?.infura !== undefined,
        id: viemChain.id,
        name: viemChain.name,
      };
    });

    const missingRPCs = chainsWithInfura.filter((c) => !c.hasInfuraRPC);

    if (missingRPCs.length > 0) {
      const missingNames = missingRPCs.map((chain) => `${chain.name} (ID: ${chain.id})`);
      throw new Error(`Missing Infura RPC configurations for:\n${missingNames.join("\n")}`);
    }

    expect(missingRPCs).toHaveLength(0);
  });

  it("should not have duplicate chain IDs in Alchemy configurations", () => {
    const chainIds = alchemySupportedChains.map((chain) => chain.id);
    const seen = new Set<number>();
    const duplicates = chainIds.filter((id) => {
      if (seen.has(id)) return true;
      seen.add(id);
      return false;
    });
    const uniqueDuplicates = [...new Set(duplicates)];

    if (uniqueDuplicates.length > 0) {
      throw new Error(`Duplicate chain IDs found in Alchemy supported chains: ${uniqueDuplicates.join(", ")}`);
    }

    expect(uniqueDuplicates).toHaveLength(0);
  });
});

describe("RPC Endpoint Connectivity", () => {
  const alchemyKey: string | undefined = process.env.VITE_ALCHEMY_API_KEY;
  const infuraKey: string | undefined = process.env.VITE_INFURA_API_KEY;
  const skipTests: boolean = !alchemyKey && !infuraKey;

  if (skipTests) {
    it("skipping RPC connectivity tests - no API keys provided", () => {
      console.warn("Set VITE_ALCHEMY_API_KEY or VITE_INFURA_API_KEY to run RPC tests");
    });
    return;
  }

  describe("Alchemy RPC endpoints", () => {
    if (!alchemyKey) {
      it("skipping Alchemy tests - no API key provided", () => {
        console.warn("Set VITE_ALCHEMY_API_KEY to run Alchemy RPC tests");
      });
      return;
    }

    const chainsWithAlchemy = alchemySupportedChains.filter((viemChain) => {
      const exportedChain = Object.values(chains).find(
        (c): c is typeof chains.mainnet => typeof c === "object" && c !== null && "id" in c && c.id === viemChain.id,
      );
      return exportedChain?.rpc?.alchemy !== undefined;
    });

    it.each(chainsWithAlchemy)(
      "should connect to Alchemy RPC for $name",
      async (viemChain) => {
        const exportedChain = Object.values(chains).find(
          (c): c is typeof chains.mainnet => typeof c === "object" && c !== null && "id" in c && c.id === viemChain.id,
        );

        if (!exportedChain?.rpc?.alchemy) {
          throw new Error(`No Alchemy RPC found for ${viemChain.name}`);
        }

        const url: string = exportedChain.rpc.alchemy(alchemyKey);
        const works: boolean = await testRPCEndpoint(url, viemChain.id);

        expect(works).toBe(true);
      },
      15000,
    );
  });

  describe("Infura RPC endpoints", () => {
    if (!infuraKey) {
      it("skipping Infura tests - no API key provided", () => {
        console.warn("Set VITE_INFURA_API_KEY to run Infura RPC tests");
      });
      return;
    }

    const chainsWithInfura = infuraSupportedChains.filter((viemChain) => {
      const exportedChain = Object.values(chains).find(
        (c): c is typeof chains.mainnet => typeof c === "object" && c !== null && "id" in c && c.id === viemChain.id,
      );
      return exportedChain?.rpc?.infura !== undefined;
    });

    it.each(chainsWithInfura)(
      "should connect to Infura RPC for $name",
      async (viemChain) => {
        const exportedChain = Object.values(chains).find(
          (c): c is typeof chains.mainnet => typeof c === "object" && c !== null && "id" in c && c.id === viemChain.id,
        );

        if (!exportedChain?.rpc?.infura) {
          throw new Error(`No Infura RPC found for ${viemChain.name}`);
        }

        const url: string = exportedChain.rpc.infura(infuraKey);
        const works: boolean = await testRPCEndpoint(url, viemChain.id);

        expect(works).toBe(true);
      },
      15000,
    );
  });
});
