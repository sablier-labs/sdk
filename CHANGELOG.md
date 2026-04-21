# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org/).

> [!NOTE]
>
> Starting with v2.0.0, this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). In v1.x, it
> did not always follow Semantic Versioning.

[3.10.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.10.0
[3.9.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.9.0
[3.8.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.8.0
[3.7.5]: https://github.com/sablier-labs/sdk/releases/tag/v3.7.5
[3.7.4]: https://github.com/sablier-labs/sdk/releases/tag/v3.7.4
[3.7.3]: https://github.com/sablier-labs/sdk/releases/tag/v3.7.3
[3.7.2]: https://github.com/sablier-labs/sdk/releases/tag/v3.7.2
[3.7.1]: https://github.com/sablier-labs/sdk/releases/tag/v3.7.1
[3.7.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.7.0
[3.6.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.6.0
[3.5.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.5.0
[3.4.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.4.0
[3.3.5]: https://github.com/sablier-labs/sdk/releases/tag/v3.3.5
[3.3.4]: https://github.com/sablier-labs/sdk/releases/tag/v3.3.4
[3.3.3]: https://github.com/sablier-labs/sdk/releases/tag/v3.3.3
[3.3.2]: https://github.com/sablier-labs/sdk/releases/tag/v3.3.2
[3.3.1]: https://github.com/sablier-labs/sdk/releases/tag/v3.3.1
[3.3.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.3.0
[3.2.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.2.0
[3.1.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.1.0
[3.0.0]: https://github.com/sablier-labs/sdk/releases/tag/v3.0.0
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

## [3.10.0] - 2026-04-21

### Added

- Add `comptroller` feature flag to `AirdropsReleaseFeatures`, `FlowReleaseFeatures`, and `LockupReleaseFeatures`,
  tracking whether a release wires a Comptroller reference (`ISablierComptroller` or the legacy `ISablierV2Comptroller`)
  into its contracts
- Add `usesComptroller(release)` helper for querying Comptroller integration across Airdrops, Flow, and Lockup releases

### Changed

- Change comptroller release version from `v2.0` to `v1.1` ([#177](https://github.com/sablier-labs/sdk/pull/177))

### Fixed

- Replace misplaced v2.0+ ABI shipped under airdrops v1.3 for `SablierMerkleLockup` with the real v1.3 ABI (immutable
  `FEE` pattern, `LOCKUP` naming, no oracle-driven min-fee entries)
  ([#174](https://github.com/sablier-labs/sdk/issues/174))

## [3.9.0] - 2026-04-16

### Added

- Add `hasSimpleTransfer` helper that reports whether a Flow release exposes the `transferTokens` ERC-20 wrapper
  ([`59530a2`](https://github.com/sablier-labs/sdk/commit/59530a2))

## [3.8.0] - 2026-04-16

### Added

- Add `simpleTransfer` feature to `FlowReleaseFeatures`, flagging releases that expose the `transferTokens` ERC-20
  wrapper (introduced in `flow@v2.0`) ([`ce995be`](https://github.com/sablier-labs/sdk/commit/ce995be))

### Changed

- Expand JSDoc glossary on `evmReleaseFeatures` to document the release version each capability was introduced in
  ([`fdf40ae`](https://github.com/sablier-labs/sdk/commit/fdf40ae))

## [3.7.5] - 2026-04-16

### Added

- BattleChain testnet deployments ([`c13ce82`](https://github.com/sablier-labs/sdk/commit/c13ce82)),
  ([`adfbe42`](https://github.com/sablier-labs/sdk/commit/adfbe42))

## [3.7.4] - 2026-04-10

### Fixed

- Return `false` for unknown versions in `isEvmReleasePayable` instead of throwing a runtime error
  ([`e14a270`](https://github.com/sablier-labs/sdk/commit/e14a270))

## [3.7.3] - 2026-04-10

### Fixed

- Fix root `sablier` release-feature helper exports for downstream type-checkers
  ([`93947a7`](https://github.com/sablier-labs/sdk/commit/93947a7))
- Fix `sablier/evm/releases` and `sablier/evm/releases/features` package exports
  ([`93947a7`](https://github.com/sablier-labs/sdk/commit/93947a7))

## [3.7.2] - 2026-04-10

### Added

- Add explicit subpath exports for EVM and Solana modules (`sablier/evm/chains`, `sablier/evm/helpers`,
  `sablier/solana/chains`, etc.) ([`e4574ac`](https://github.com/sablier-labs/sdk/commit/e4574ac))

### Fixed

- Fix EVM helpers barrel to use explicit named re-exports, improving type resolution for downstream consumers
  ([`e4574ac`](https://github.com/sablier-labs/sdk/commit/e4574ac))

## [3.7.1] - 2026-04-10

### Fixed

- Export missing feature helpers and types from `sablier/evm/helpers` subpath
  ([`7bfbb85`](https://github.com/sablier-labs/sdk/commit/7bfbb85))

## [3.7.0] - 2026-04-10

### Changed

- Add `minFee` capability flags to Flow and Lockup release feature bags
  ([`d0e0940`](https://github.com/sablier-labs/sdk/commit/d0e0940))
- Document the EVM release feature registry with protocol changelog references
  ([`d0e0940`](https://github.com/sablier-labs/sdk/commit/d0e0940))

### Added

- Add `hasOnchainMinFee` helper for querying on-chain minimum fee support across Flow and Lockup releases
  ([`d0e0940`](https://github.com/sablier-labs/sdk/commit/d0e0940))

## [3.6.0] - 2026-04-09

### Changed

- Widen feature helper input types from protocol-specific version enums to `EVM.Version`, returning `undefined` or
  `false` for non-matching protocols ([`718f465`](https://github.com/sablier-labs/sdk/commit/718f465))
- Rename `usesLockupSplit` to `hasSplitLockupArchitecture`
  ([`66598d7`](https://github.com/sablier-labs/sdk/commit/66598d7))
- Deprecate `usesLockupSplit` in favor of `hasSplitLockupArchitecture`
  ([`66598d7`](https://github.com/sablier-labs/sdk/commit/66598d7))

### Added

- Export `hasSplitLockupArchitecture` from `sablier/evm/helpers`
  ([`66598d7`](https://github.com/sablier-labs/sdk/commit/66598d7))

## [3.5.0] - 2026-04-07

### Added

- Add `shape` feature flag to lockup release feature map, tracking on-chain shape parameter support (v2.0+)
  ([`a87174c`](https://github.com/sablier-labs/sdk/commit/a87174c))
- Add `supportsLockupShape` helper for querying shape support by lockup version
  ([`a87174c`](https://github.com/sablier-labs/sdk/commit/a87174c))

## [3.4.0] - 2026-04-07

### Added

- Add release feature registry with per-protocol capability matrices for Airdrops, Flow, and Lockup
  ([#169](https://github.com/sablier-labs/sdk/pull/169))
- Add `features` field to all release objects, populated automatically by release resolvers
  ([#169](https://github.com/sablier-labs/sdk/pull/169))
- Add protocol-specific feature accessors: `getAirdropsReleaseFeatures`, `getFlowReleaseFeatures`,
  `getLockupReleaseFeatures` ([#169](https://github.com/sablier-labs/sdk/pull/169))
- Add feature query helpers: `hasClaimTo`, `hasSponsor`, `supportsLockupBatch`, `supportsLockupPrbProxy`,
  `usesLockupSplit` ([#169](https://github.com/sablier-labs/sdk/pull/169))
- Add release object overload for `isReleasePayable` and `isEvmReleasePayable`
  ([#169](https://github.com/sablier-labs/sdk/pull/169))

### Changed

- Refactor `isEvmReleasePayable` to read from the feature registry instead of hard-coded version comparisons
  ([#169](https://github.com/sablier-labs/sdk/pull/169))
- Deprecate two-argument `isEvmReleasePayable(protocol, version)` in favor of `isEvmReleasePayable(release)`
  ([#169](https://github.com/sablier-labs/sdk/pull/169))

## [3.3.5] - 2026-03-25

### Fixed

- Add missing `BobVaultShare` ABI from Bob v1.0 release ([#168](https://github.com/sablier-labs/sdk/pull/168))

## [3.3.4] - 2026-03-25

### Fixed

- Correct `SablierBatchLockup` ABIs for Lockup v2.0 and v3.0 ([#166](https://github.com/sablier-labs/sdk/pull/166))
- Remove erroneously published `abi/comptroller/ERC1967.json` ([#166](https://github.com/sablier-labs/sdk/pull/166))

## [3.3.3] - 2026-03-24

### Fixed

- Add missing `sponsor` function to Airdrops v3.0 TypeScript ABIs ([#163](https://github.com/sablier-labs/sdk/pull/163))

## [3.3.2] - 2026-03-21

### Fixed

- Add missing deployments for Denergy

## [3.3.1] - 2026-03-20

### Fixed

- Use granularity-divisible amounts and durations in linear stepper CSV templates
  ([`5b3c025`](https://github.com/sablier-labs/sdk/commit/5b3c025))

## [3.3.0] - 2026-03-20

### Added

- Add `linearStepper` CSV templates for both duration and range modes with `granularity` field
  ([`fb5beec`](https://github.com/sablier-labs/sdk/commit/fb5beec))
- Add `granularity` definition to common CSV schema supporting daily, weekly, and yearly values
  ([`fb5beec`](https://github.com/sablier-labs/sdk/commit/fb5beec))

## [3.2.0] - 2026-03-20

### Added

- Add `linearStepper` airdrop shape using MerkleLL with the granularity feature from Airdrops v3.0
  ([`5984b3e`](https://github.com/sablier-labs/sdk/commit/5984b3e))

### Changed

- Deprecate `tranchedStepper` airdrop shape in favor of `linearStepper`
  ([`5984b3e`](https://github.com/sablier-labs/sdk/commit/5984b3e))

## [3.1.0] - 2026-03-20

### Added

- Add `linearStepper` lockup shape using LockupLinear with the granularity feature from Lockup v4.0
  ([`578d6ce`](https://github.com/sablier-labs/sdk/commit/578d6ce))

### Changed

- Deprecate `tranchedStepper` lockup shape in favor of `linearStepper`
  ([`578d6ce`](https://github.com/sablier-labs/sdk/commit/578d6ce))

## [3.0.0] - 2026-03-18

### Changed

- **Breaking:** Bump `viem` peer dependency from `^2.39` to `^2.40.1`
- Replace custom HyperEVM chain definition with viem's built-in `hyperEvm` export
- **Breaking:** Replace `comptroller.abi` and `comptroller.manifest` with versioned entries under
  `comptroller.releases["v1.0"]` and `comptroller.releases["v2.0"]`
  ([`cdd32bc`](https://github.com/sablier-labs/sdk/commit/cdd32bc))
- **Breaking:** Remove Blast Sepolia, Form, IoTeX, Meld, Mode Testnet, Morph Holesky, Taiko Hekla, Ultra chain
  definitions and all associated deployments
- Mark some chains as no longer supported in the UI (Blast, Core DAO, Sei, Sophon)

### Added

- Add Airdrops `v3.0`, Bob `v1.0`, Flow `v3.0`, and Lockup `v4.0` release metadata, deployments, and ABIs
  ([`6edaf99`](https://github.com/sablier-labs/sdk/commit/6edaf99))
- Add Bob to the EVM release catalog and contract lookup catalogs
  ([`6edaf99`](https://github.com/sablier-labs/sdk/commit/6edaf99))
- Add `coinGeckoPlatformId` to supported EVM mainnets and Solana mainnet-beta chain metadata
  ([`09b5a88`](https://github.com/sablier-labs/sdk/commit/09b5a88f0d835718b0cbb502f826ed917a16883b))
- Add WHYPE and WXDC wrapper contracts to HyperEVM and XDC chain specs
  ([`8d43894`](https://github.com/sablier-labs/sdk/commit/8d43894b6bad7de07d9d16210f9ad3affb57002c))

### Fixed

- Fix type mismatch in missing chains test helper by splitting `MISSING_CHAINS` into `MISSING_CHAIN_IDS` and
  `MISSING_CHAIN_SLUGS`
  ([`ad93cd3`](https://github.com/sablier-labs/sdk/commit/ad93cd30822212de7e41343005c705a2186f235a))
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
