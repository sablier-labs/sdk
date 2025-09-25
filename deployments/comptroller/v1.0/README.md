# v1.0

## Contracts Deployed

- `SablierComptroller`
- `ERC1967Proxy`

## Sources

TODO: update commit after PR is merged

- Commit: [8cc042f](https://github.com/sablier-labs/evm-utils/commit/8cc042ffba670bb04feae52d88d62e8984f22d6d)
- Package: [@sablier/evm-utils@1.0.0](https://www.npmjs.com/package/@sablier/evm-utils/v/1.0.0)

## Configurations

| Compiler Setting | Value    |
| ---------------- | -------- |
| Tool             | Foundry  |
| EVM              | Shanghai |
| Solc             | v0.8.29  |
| Via IR           | true     |
| Optimizer Runs   | 10000    |

### Exceptions

1. For Linea, `paris` is used as the EVM version.
2. For Abstract, Sophon and ZkSync, `zksolc =v1.5.15` is used.

### Salt

All contracts are deployed using Foundry's `CREATE2` factory. The following salts are used:

1. Comptroller Implementation: `Version 1.0.0`
2. Comptroller Proxy: `0xf26994e6af0b95cca8dfa22a0bc25e1f38a54c42d98a250c915c3f25c66e005e`
