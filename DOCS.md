# Sablier SDK Documentation

## Scope

Use this SDK to read Sablier deployment data (addresses, releases, chains) for EVM and Solana. Pair it with viem or
@solana/web3.js when you need RPC calls.

## Installation

```bash
bun add sablier
# or
npm install sablier
# or
pnpm add sablier
# or
yarn add sablier
```

## Import patterns

Use `sablier` for query APIs and `releases`/`chains`/`contracts` for raw data exports.

```ts
import { sablier, evm, solana, releases, contracts } from "sablier";
import { chains as evmChains } from "sablier/evm/chains";
import { chains as solanaChains } from "sablier/solana/chains";
```

Notes:

- The root `sablier.chains`, `sablier.releases`, `sablier.contracts` are EVM queries. They are the same as
  `sablier.evm.chains`, etc.
- `sablier.evm` and `sablier.solana` scope the same query helpers by platform.
- `evm` and `solana` are data modules (chains, releases, csv, helpers, enums).
- `releases` and `contracts` are data exports, not queries. For queries, use `sablier.*`.

## Usage

### EVM

Query chains, releases, contracts, and deployments:

```ts
import { sablier, chains } from "sablier";

const mainnet = chains.mainnet;
const latestLockup = sablier.releases.getLatest({ protocol: "lockup" });

const lockup = sablier.contracts.get({
  chainId: mainnet.id,
  contractName: "SablierLockup",
  release: latestLockup,
});

const byAlias = sablier.contracts.getByAlias({
  alias: "LK2",
  chainId: mainnet.id,
  protocol: "lockup",
});

const deployment = sablier.deployments.get({
  chainId: mainnet.id,
  release: latestLockup,
});
```

Query surface:

- `sablier.chains.get|getAll|getBySlug|getMainnets|getTestnets|getOrThrow`
- `sablier.releases.get|getAll|getFirst|getLatest`
- `sablier.contracts.get|getAll|getByAlias|getLatestByName`
- `sablier.deployments.get|getAll`
- `sablier.comptroller.get|getAll` (governance proxy)

### Solana

Query chains, releases, programs, and deployments:

```ts
import { sablier } from "sablier";

const mainnet = sablier.solana.chains.getBySlug("solana-mainnet-beta");
const latestLockup = sablier.solana.releases.getLatest({ protocol: "lockup" });

const program = sablier.solana.programs.get({
  chainId: mainnet.id,
  contractName: "SablierLockupLinear",
  release: latestLockup,
});

const deployment = sablier.solana.deployments.get({
  chainId: mainnet.id,
  release: latestLockup,
});
```

Query surface:

- `sablier.solana.chains.get|getAll|getBySlug|getMainnets|getTestnets|getOrThrow`
- `sablier.solana.releases.get|getAll|getFirst|getLatest`
- `sablier.solana.programs.get|getAll|getByAlias|getLatestByName`
- `sablier.solana.deployments.get|getAll`

## Helpers

Use shared helpers from the package root:

- `truncateAddress` / `truncate` (EVM and Solana)
- `resolveStreamId` (routes to EVM or Solana by chain ID)
- `isReleasePayable` (EVM-only protocol fee check)
- `compareVersions`, `isVersionBefore`, `isVersionAfter`

Platform-specific helpers are also exported:

- EVM: `getContractExplorerURL`, `resolveEvmContractByAlias`, `resolveEvmStreamId`, `truncateEvmAddress`
- Solana: `resolveSolanaProgramByAlias`, `resolveSolanaStreamId`, `truncateSolanaAddress`

## Data exports and assets

- EVM releases: `releases` (e.g., `releases.lockup`, `releases.flow`)
- Solana releases: `solana.releases`
- EVM contract catalogs and names: `contracts.catalog`, `contracts.names`
- Solana program catalogs and names: `solana.programs.catalog`, `solana.programs.names`
- ABIs: `sablier/abi/*` (copied from `abi/` during build)
- Solana IDL maps: `sablier/solana/releases/<protocol>/idl`
- CSV templates: `evm.csv.*` and `solana.csv.*` types; raw CSV files live in `csv/`

## Types

Import SDK types from the `Sablier` namespace:

```ts
import type { Sablier } from "sablier";

type EvmRelease = Sablier.EVM.Release;
type SolanaProgram = Sablier.Solana.Program;
```

## Notes

- `contracts.get` and `programs.get` require `release` when you query by name.
- Address lookups can be ambiguous across releases; pass `protocol` or `release` to disambiguate.
