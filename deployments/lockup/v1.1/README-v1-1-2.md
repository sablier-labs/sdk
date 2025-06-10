# v1.1.1

See the [changelog](https://github.com/sablier-labs/v2-periphery/blob/main/CHANGELOG.md).

## Contract Deployed

- SablierV2Batch
- SablierV2MerkleStreamerFactory

## Sources

- Commit: [53e2590](https://github.com/sablier-labs/v2-periphery/commit/53e259087984ff748fca6fb932fdb9c663c2b365)
- Package: [@sablier/v2-periphery@1.1.1](https://www.npmjs.com/package/@sablier/v2-periphery/v/1.1.1)

## Compiler Settings

| Setting        | Value  |
| :------------- | :----- |
| Version        | 0.8.23 |
| EVM            | Paris  |
| Optimizer      | Yes    |
| Optimizer Runs | 10,000 |
| Via IR         | true   |

## Salts

The CREATE2 salts used during deployment:

### Mainnets

| Chain     | Salt                         |
| :-------- | :--------------------------- |
| Avalanche | ChainID 43114, Version 1.1.0 |
| LightLink | ChainID 1890, Version 1.1.0  |
| Taiko     | No salt                      |
| zkSync    | No salt                      |

### Testnets

| Chain            | Salt                            |
| :--------------- | :------------------------------ |
| Base Sepolia     | ChainID 84532, Version 1.1.1    |
| Optimism Sepolia | ChainID 11155420, Version 1.1.0 |

**Note:** we have accidentally set the version to "1.1.0" in the Salt. It should have been "v1.1.1".
