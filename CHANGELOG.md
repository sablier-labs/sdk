# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.4.2]: https://github.com/sablier-labs/sdk/releases/tag/v1.4.2
[1.4.1]: https://github.com/sablier-labs/sdk/releases/tag/v1.4.1
[1.4.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.4.0
[1.3.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.3.0
[1.2.2]: https://github.com/sablier-labs/sdk/releases/tag/v1.2.2
[1.2.1]: https://github.com/sablier-labs/sdk/releases/tag/v1.2.1
[1.2.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.2.0
[1.1.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.1.0
[1.0.0]: https://github.com/sablier-labs/sdk/releases/tag/v1.0.0

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

- RouteMesh RPC provider support ([#63](https://github.com/sablier-labs/sdk/pull/63))

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
