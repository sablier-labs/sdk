# Migration Guide

## Migrating from v1.x to v2.0.0

Version 2.0.0 introduces breaking changes to prepare the SDK for multi-VM support. All EVM-specific code has been
namespaced under `evm` to allow future expansion to other VMs (like Solana).

### Breaking Changes

#### 1. Sablier API Renamed

The `sablier` object properties have been renamed to include the `evm` prefix:

**Before (v1.x)**:

```typescript
import { sablier } from "sablier";

const chain = sablier.chains.get({ chainId: 1 });
const contract = sablier.contracts.get({
  name: "SablierLockup",
  release: releases.lockup["v2.0"],
  chainId: 1,
});
const releases = sablier.releases.getAll();
const deployment = sablier.deployments.get({
  chainId: 1,
  release: releases.lockup["v2.0"],
});
```

**After (v2.0.0)**:

```typescript
import { sablier } from "sablier";

const chain = sablier.evm,chains.get({ chainId: 1 });
const contract = sablier.evm.contracts.get({
  contractName: "SablierLockup",
  release: releases.lockup["v2.0"],
  chainId: 1,
});
const releases = sablier.evm.releases.getAll();
const deployment = sablier.evm.deployments.get({
  chainId: 1,
  release: releases.lockup["v2.0"],
});
```

**Quick Replace**:

- `sablier.chains` → `sablier.evm.chains`
- `sablier.contracts` → `sablier.evm.contracts`
- `sablier.releases` → `sablier.evm.releases`
- `sablier.deployments` → `sablier.evm.deployments`

#### 2. Import Paths Changed

If you were using direct imports from subpaths, the paths have changed:

**Before (v1.x)**:

```typescript
import { chains } from "sablier/chains";
import { contracts } from "sablier/contracts";
import { releases } from "sablier/releases";
```

**After (v2.0.0)**:

```typescript
// Option 1: Import from main entry point
import { chains, contracts, releases } from "sablier";

// Option 2: Import from EVM-specific paths
import { chains } from "sablier/evm/chains";
import { contracts } from "sablier/evm/contracts";
import { releases } from "sablier/evm/releases";

// Option 3: Import everything from evm
import { chains, contracts, releases } from "sablier/evm";
```

**Recommendation**: Use Option 1 (main entry point) unless you need to optimize bundle size.

#### 3. Type Namespace Updated

All EVM-specific types are now under the `Sablier.EVM` namespace:

**Before (v1.x)**:

```typescript
import type { Sablier } from "sablier";

type Address = Sablier.Address;
type Chain = Sablier.Chain;
type Contract = Sablier.Contract;
type Release = Sablier.Release;
type Deployment = Sablier.Deployment;
type Protocol = Sablier.Protocol;
type Version = Sablier.Version;
```

**After (v2.0.0)**:

```typescript
import type { Sablier } from "sablier";

type Address = Sablier.EVM.Address;
type Chain = Sablier.EVM.Chain;
type Contract = Sablier.EVM.Contract;
type Release = Sablier.EVM.Release;
type Deployment = Sablier.EVM.Deployment;
type Protocol = Sablier.EVM.Protocol;
type Version = Sablier.EVM.Version;
```

**Quick Replace in TypeScript files**:

- `Sablier.Address` → `Sablier.EVM.Address`
- `Sablier.Chain` → `Sablier.EVM.Chain`
- `Sablier.Contract` → `Sablier.EVM.Contract`
- `Sablier.Release` → `Sablier.EVM.Release`
- `Sablier.Deployment` → `Sablier.EVM.Deployment`
- `Sablier.Protocol` → `Sablier.EVM.Protocol`
- `Sablier.Version` → `Sablier.EVM.Version`

### Non-Breaking Changes

The following imports continue to work without changes:

```typescript
// These still work exactly the same
import { chains } from "sablier";
import { contracts } from "sablier";
import { releases } from "sablier";
import { sablier } from "sablier";

// Direct exports like these are unchanged
import { mainnet, arbitrum, polygon } from "sablier";
import { Protocol, Version } from "sablier";
```

### Migration Checklist

Use this checklist to ensure you've updated everything:

- [ ] Update all `sablier.chains.*` to `sablier.evm.chains.*`
- [ ] Update all `sablier.contracts.*` to `sablier.evm.contracts.*`
- [ ] Update all `sablier.releases.*` to `sablier.evm.releases.*`
- [ ] Update all `sablier.deployments.*` to `sablier.evm.deployments.*`
- [ ] Update all `Sablier.Address` type references to `Sablier.EVM.Address`
- [ ] Update all `Sablier.Chain` type references to `Sablier.EVM.Chain`
- [ ] Update all `Sablier.Contract` type references to `Sablier.EVM.Contract`
- [ ] Update all `Sablier.Release` type references to `Sablier.EVM.Release`
- [ ] Update all `Sablier.Deployment` type references to `Sablier.EVM.Deployment`
- [ ] Update any direct import paths from `sablier/chains` to `sablier/evm/chains` (or use main entry)
- [ ] Run TypeScript compiler to catch any remaining type errors
- [ ] Test your application thoroughly

### Automated Migration

You can use find-and-replace to automate most of the migration:

#### Runtime Code:

```bash
# Find and replace in your codebase
sablier.chains → sablier.evm.chains
sablier.contracts → sablier.evm.contracts
sablier.releases → sablier.evm.releases
sablier.deployments → sablier.evm.deployments
```

#### Type Definitions:

```bash
# Find and replace type references
Sablier.Address → Sablier.EVM.Address
Sablier.Chain → Sablier.EVM.Chain
Sablier.Contract → Sablier.EVM.Contract
Sablier.Release → Sablier.EVM.Release
Sablier.Deployment → Sablier.EVM.Deployment
Sablier.Protocol → Sablier.EVM.Protocol
Sablier.Version → Sablier.EVM.Version
```

#### Import Paths:

```bash
# If you used direct imports (optional)
"sablier/chains" → "sablier/evm/chains"
"sablier/contracts" → "sablier/evm/contracts"
"sablier/releases" → "sablier/evm/releases"
```

### Why This Change?

This refactor prepares the SDK for multi-VM support. The EVM namespace makes it explicit which blockchain VM you're
working with and allows us to add support for other VMs in the future:

```typescript
// Future (planned):
sablier.evm.chains; // Ethereum, Arbitrum, Polygon, etc.
sablier.solana.chains; // Solana mainnet, devnet, testnet
sablier.evm.contracts; // EVM smart contracts
sablier.solana.programs; // Solana programs
```

By namespacing everything under `evm`, we're making the codebase more maintainable and preparing for a multi-chain
future.

### Need Help?

If you encounter any issues during migration:

1. Check the [README](./README.md) for updated examples
2. Review the [CHANGELOG](./CHANGELOG.md) for detailed changes
3. Open a [discussion](https://github.com/sablier-labs/sdk/discussions) on GitHub
4. Join our [Discord](https://discord.sablier.com) for community support

### Example Migration

Here's a complete before/after example:

**Before (v1.x)**:

```typescript
import { sablier, releases, chains } from "sablier";
import type { Sablier } from "sablier";

function getContractInfo(chainId: number): {
  chain: Sablier.Chain;
  contract: Sablier.Contract;
} {
  const chain = sablier.chains.get({ chainId });
  const contract = sablier.contracts.get({
    name: "SablierLockup",
    release: releases.lockup["v2.0"],
    chainId,
  });

  return { chain, contract };
}
```

**After (v2.0.0)**:

```typescript
import { sablier, releases, chains } from "sablier";
import type { Sablier } from "sablier";

function getContractInfo(chainId: number): {
  chain: Sablier.EVM.Chain;
  contract: Sablier.EVM.Contract;
} {
  const chain = sablier.evm.chains.get({ chainId });
  const contract = sablier.evm.contracts.get({
    contractName: "SablierLockup",
    release: releases.lockup["v2.0"],
    chainId,
  });

  return { chain, contract };
}
```

Notice the changes:

1. `sablier.chains` → `sablier.evm.chains`
2. `sablier.contracts` → `sablier.evm.contracts`
3. `Sablier.Chain` → `Sablier.EVM.Chain`
4. `Sablier.Contract` → `Sablier.EVM.Contract`
