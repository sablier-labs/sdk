# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org/).

> [!NOTE]
>
> Starting with v2.0.0, this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). In v1.x, it
> did not always follow Semantic Versioning.

[3.0.0-beta.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.0.0-beta.0
[2.0.4]: https://github.com/sablier-labs/sdk/releases/tag/v2.0.4
[2.0.3]: https://github.com/sablier-labs/sdk/releases/tag/v2.0.3
[2.0.2]: https://github.com/sablier-labs/sdk/releases/tag/v2.0.2
[2.0.1]: https://github.com/sablier-labs/sdk/releases/tag/v2.0.1
[2.0.0]: https://github.com/sablier-labs/sdk/releases/tag/v2.0.0
[1.8.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.8.0
[1.7.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.7.0
[1.6.1]: https://github.com/sablier-labs/sdk/releases/tag/v1.6.1
[1.6.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.6.0
[1.5.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.5.0
[1.4.3]: https://github.com/sablier-labs/sdk/releases/tag/v1.4.3
[1.4.2]: https://github.com/sablier-labs/sdk/releases/tag/v1.4.2
[1.4.1]: https://github.com/sablier-labs/sdk/releases/tag/v1.4.1
[1.4.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.4.0
[1.3.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.3.0
[1.2.2]: https://github.com/sablier-labs/sdk/releases/tag/v1.2.2
[1.2.1]: https://github.com/sablier-labs/sdk/releases/tag/v1.2.1
[1.2.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.2.0
[1.1.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.1.0
[1.0.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.0.0

## [3.0.0-beta.0] - 2026-03-18

### Changed

- **Breaking:** Replace `comptroller.abi` and `comptroller.manifest` with versioned entries under
  `comptroller.releases["v1.0"]` and `comptroller.releases["v2.0"]`
  ([`cdd32bc`](https://github.com/sablier-labs/sdk/commit/cdd32bc))
- **Breaking:** Mark Airdrops `v3.0`, Flow `v3.0`, and Lockup `v4.0` as the latest EVM release lines, which changes
  latest-release lookups ([`6edaf99`](https://github.com/sablier-labs/sdk/commit/6edaf99))
- **Breaking:** Remove Form and IoTeX chain definitions and all associated deployments
  ([#145](https://github.com/sablier-labs/sdk/issues/145))
- **Breaking:** Remove Blast Sepolia and Mode Testnet chain definitions and all associated deployments

### Added

- Add Airdrops `v3.0`, Bob `v1.0`, Flow `v3.0`, and Lockup `v4.0` release metadata, deployments, and ABIs
  ([`6edaf99`](https://github.com/sablier-labs/sdk/commit/6edaf99))
- Add Bob to the EVM release catalog and contract lookup catalogs
  ([`6edaf99`](https://github.com/sablier-labs/sdk/commit/6edaf99))
- Add `coinGeckoPlatformId` to supported EVM mainnets and Solana mainnet-beta chain metadata
  ([`09b5a88`](https://github.com/sablier-labs/sdk/commit/09b5a88f0d835718b0cbb502f826ed917a16883b))
- Add WHYPE and WXDC wrapper contracts to HyperEVM and XDC chain specs

### Fixed

- Disable RouteMesh RPC for Form, Meld, and Taiko Hekla on unsupported chains
  ([`0123fd2`](https://github.com/sablier-labs/sdk/commit/0123fd2db03fadfa142779fe32c309421ec0fafc))
- Fix the Monad wrapper contract checksum
  ([`b9ba82b`](https://github.com/sablier-labs/sdk/commit/b9ba82bf2126919a4da9222d7cb5b15f737acee0))

## [2.0.4] - 2026-02-04

### Removed

- Remove `sablier/evm/releases/<protocol>/*/abi/*` subpath exports

## [2.0.3] - 2026-02-04

### Changed

- Update ZKsync block explorers to use official ZKsync Explorer URLs

### Added

- Export individual ABI files via `sablier/evm/releases/<protocol>/*/abi/*` subpaths
- Add wrapper contract for Denergy native currency

## [2.0.2] - 2026-01-29

### Changed

- Set `isSupportedByUI` to `true` for Mode chain

## [2.0.1] - 2026-01-24

### Fixed

- Fix CommonJS output

## [2.0.0] - 2026-01-23

### Changed

- **Breaking**: Adopt ESM-first packaging (`type: module`) with split outputs in `dist/esm`, `dist/cjs`, and
  `dist/types`; update the export map with wildcard subpaths (`./evm/*`, `./solana/*`).
- **Breaking**: Update `truncateAddress` to accept `{ start, end }` options instead of `chars` (use `truncate` as a
  convenience alias).
- **Breaking**:Move ABIs to top-level `abi/` and export them via `sablier/abi/*`.
- Default Solana explorers to Orb (keep Solscan as secondary).
- Update CLI command layout (`check-broadcasts` promoted to top-level); use `bunx tsx` as the runner.
- Standardize shape identifiers and CSV template naming (aligned filenames, `DynamicDoubleUnlock` naming).

### Added

- Add top-level `shapes` module (airdrops/flow/lockup) with enums, helpers, types, and `isDeprecated` metadata.
- Add CSV templates and JSON schemas for EVM and Solana (airdrops, flow, lockup duration/range) plus typed exports under
  `sablier/evm/csv`, `sablier/solana/csv`, and raw assets via `sablier/csv/*`.
- Add alias-based lookup APIs: `contracts.getByAlias`, `programs.getByAlias`, `resolveEvmContractByAlias`,
  `resolveSolanaProgramByAlias`.
- Add `getLatestByName` helper for contract lookups by name.
- Add stream ID helpers (`resolveStreamId`, `resolveEvmStreamId`, `resolveSolanaStreamId`)
- Add payability helper (`isReleasePayable`), which checks if a release allows `msg.value` on withdraw/claim operations.
- Add compatibility helpers between Airdrops and Lockup releases for both EVM and Solana.
- Add deployment broadcasts for additional EVM networks (IoTeX, Lightlink, Tangle, Superseed, and more) across
  airdrops/flow/lockup/comptroller.
- Export Solana chain ID constants (`CHAIN_ID_SOLANA_*`) and `SOLANA_CHAIN_IDS`.
- Add wrapper contracts for native tokens (e.g., WETH) in `nativeCurrency.wrapperContract`.
- Add `DOCS.md` with SDK usage, query surfaces, helpers, and data layouts.

### Fixed

- Normalize explorer URLs to avoid trailing slash issues.
- Prevent runtime evaluation of type-only exports.

### Removed

- **Breaking**: Remove `sablier/dist/*` subpath export; use package exports instead.
- **Breaking**: Remove `sortChains` and `getNestedValues` from public helpers (now internal).
- Remove Monad testnet deployments/chain entry (`monad-testnet`).

## [1.8.0] - 2026-01-16

### Changed

- Modularize comptroller into dedicated directory structure ([#134](https://github.com/sablier-labs/sdk/pull/134))

### Added

- Add SablierComptroller and ERC-1967 proxy ABIs ([#134](https://github.com/sablier-labs/sdk/pull/134))
- Add comptroller manifest with contract names ([#134](https://github.com/sablier-labs/sdk/pull/134))
- Export Comptroller queries via `sablier.comptroller` object ([#134](https://github.com/sablier-labs/sdk/pull/134))

### Fixed

- Checksum Comptroller address ([#134](https://github.com/sablier-labs/sdk/pull/134))
- Fix pollution of default namespace by removing the comptroller exports
  ([#134](https://github.com/sablier-labs/sdk/pull/134))

## [1.7.0] - 2025-12-02

### Changed

- Extend comparison functions to support both EVM and Solana versions
  ([#102](https://github.com/sablier-labs/sdk/pull/102))

### Added

- Add support for new EVM chain: Denergy ([#104](https://github.com/sablier-labs/sdk/pull/104))

### Removed

- Remove deprecated Morph Holesky testnet ([#103](https://github.com/sablier-labs/sdk/pull/103))

## [1.6.1] - 2025-11-24

### Fixed

- Export ABIs ([#99](https://github.com/sablier-labs/sdk/pull/99))

## [1.6.0] - 2025-11-19

### Changed

- Import Monad from viem

### Added

- Add utility for truncating addresses ([#91](https://github.com/sablier-labs/sdk/pull/91))

## [1.5.0] - 2025-11-10

### Changed

- Move the EVM modules (abi, chains, contracts, releases, etc.) to the `evm` namespace

### Added

- Add Solana deployments ([#82](https://github.com/sablier-labs/sdk/pull/82),
  [#83](https://github.com/sablier-labs/sdk/pull/83), [#84](https://github.com/sablier-labs/sdk/pull/84),
  [#85](https://github.com/sablier-labs/sdk/pull/85), [#86](https://github.com/sablier-labs/sdk/pull/86),
  [#88](https://github.com/sablier-labs/sdk/pull/88))
- Add EVM and Solana types: `Sablier.EVM.*` and `Sablier.Solana.*` (note: `Sablier.*` is aliased to `Sablier.EVM.*`)
- Add support for new EVM chain: Monad

## [1.4.3] - 2025-11-09

### Changed

- Packages can be imported without `/dist` prefix

### Fixed

- Fix block number for Flow 2.0 on Linea
- fix block number for Lockup 3.0 on Arbitrum Sepolia

## [1.4.2] - 2025-10-22

### Changed

- Revert RouteMesh RPC provider to optional in chain type definitions

## [1.4.1] - 2025-10-22

### Changed

- Make RouteMesh RPC provider non-optional in chain type definitions

## [1.4.0] - 2025-10-22

### Added

- Version comparison utilities: `compareVersions`, `isVersionBefore`, and `isVersionAfter` helpers
  ([#64](https://github.com/sablier-labs/sdk/pull/64))

## [1.3.0] - 2025-10-21

### Added

- Add support for RouteMesh RPC provider ([#63](https://github.com/sablier-labs/sdk/pull/63))

## [1.2.2] - 2025-10-21

### Fixed

- Update SEI CoinGecko ID to `sei-network`

## [1.2.1] - 2025-10-17

### Fixed

- Include JSON ABIs in the package
- Update POL CoinGecko ID to `polygon-ecosystem-token` ([#54](https://github.com/sablier-labs/sdk/pull/54))

## [1.2.0] - 2025-10-15

### Added

- Airdrops v2.0 release ([#38](https://github.com/sablier-labs/sdk/pull/38))
- Flow v2.0 release ([#43](https://github.com/sablier-labs/sdk/pull/43))
- Lockup v3.0 release ([#41](https://github.com/sablier-labs/sdk/pull/41))
- Query support for same address across releases ([#48](https://github.com/sablier-labs/sdk/pull/48))

## [1.1.0] - 2025-08-21

### Added

- Add new EVM chain: Sonic ([#24](https://github.com/sablier-labs/sdk/pull/24))

### Fixed

- Correct start block for `SablierLockup` v2.0 contract on Mode chain
  ([#22](https://github.com/sablier-labs/sdk/pull/22))

## [1.0.0] - 2025-08-15

### Added

- Initial release
