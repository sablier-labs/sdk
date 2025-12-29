# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org/).

> [!NOTE]
>
> This project may not always adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

## [1.7.1] - 2025-12-29

### Changed

- Denergy contract deploy block numbers ([#102](https://github.com/sablier-labs/sdk/pull/124))

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
