# Development Instructions

AI agents working on this TypeScript SDK must follow these guidelines.

## Lint Rules

After generating code, run these commands **in order**.

**File argument rules:**

- Changed fewer than 10 files? → Pass specific paths or globs
- Changed 10+ files? → Omit file arguments to process all files

**Command sequence:**

1. **Identify which file types changed**

2. **`just biome-lint <files>`** — lint JS/TS/JSON/CSS/GraphQL (skip if none changed)

3. **`just tsc-check`** — verify TypeScript types (always run on entire project)

**Examples:**

```bash
# Fewer than 10 files: use specific paths
just biome-lint app/page.tsx app/layout.tsx

# More than 10 files: use globs
just biome-lint app/**/*.ts app/**/*.tsx

# 10+ files: omit file arguments
just biome-lint

# TypeScript check always runs on entire project
just tsc-check
```

If any command fails, analyze the errors and fix them before continuing. Then, run `just biome-write` to format all code
at the end.

## Context

This repo provides a TypeScript SDK and CLI for the [Sablier Protocol](https://sablier.com), an onchain token
distribution protocol. The SDK exports:

- Contract addresses across 4 protocols (Airdrops, Lockup, Flow, Legacy) deployed to 20+ EVM and Solana chains
- Deployment metadata from Foundry broadcasts
- Chain configurations extending Viem's `Chain` type
- Release version management

The CLI is an internal tool for printing deployment information during development.

## Commands

### Dependency Management

```bash
ni                  # Install all dependencies
ni package-name     # Add runtime dependency
ni -D package-name  # Add dev dependency
nun package-name    # Remove dependency
```

### Development Workflow

```bash
just build          # Build library (tsc + tsc-alias + copy ABIs)
just test           # Run tests with Vitest
just test <file>    # Run specific test file
just biome-lint     # Lint check
just biome-check    # Lint and format check
just biome-write    # Auto-fix issues
just tsc-check      # TypeScript validation
just clean          # Remove dist/

# CLI usage (after build)
bunx tsx cli        # Show CLI help
bunx tsx cli print  # Print deployment info
```

### Testing

- **Local**: 10s timeout, no retries
- **CI**: 60s timeout, 10 retries for flaky RPC calls
- **Cron tests**: Separate suite in `tests/cron/` for scheduled CI runs

**Targeted tests:** Run only tests relevant to your changes:

```bash
# Example: changes to src/evm/shapes/ → run shapes tests
just test tests/shapes.test.ts
```

Skip `tests/cron/` locally—these test external services and run on CI schedule.

## Build System

Uses `just` + Bun + TypeScript with dual CJS/ESM output:

- **ESM**: `tsc` + `tsc-alias` using `configs/tsconfig.esm.json` → `dist/esm/`
- **Types**: `tsc` + `tsc-alias` using `configs/tsconfig.types.json` → `dist/types/`

For development, run only ESM and types builds (`just tsc-build-esm` and `just tsc-build-types`). The full `just build`
runs all three outputs (including CJS) and copies ABIs.

**Path aliases:**

- `@/src/*` → `src/*`

**Pre-commit:** Husky runs lint-staged with Biome checks.

## Code Standards

### TypeScript

- Strict mode enabled
- Avoid `any`; use `unknown` if type is truly unknown
- Prefer `type` over `interface` for object shapes
- Export types from `types.ts` or co-located `.types.ts` files
- Use `satisfies` operator for type-safe constants

### Architecture Patterns

**Multi-protocol design:**

- Each protocol (Airdrops, Lockup, Flow, Legacy) has versioned releases
- Releases contain deployment data for multiple chains
- Contract addresses keyed by `{ protocol, version, chainId, contractName }`

**Viem integration:**

- Chain types extend Viem's `Chain` with Sablier-specific fields (`isSupportedByUI`, `slug`)
- Export chains compatible with Viem's `createPublicClient({ chain })`

**Granular exports:**

```typescript
import { sablier } from "sablier"; // Main API
import { chains } from "sablier/evm/chains"; // Chains only
import { releases } from "sablier/evm/releases"; // Releases only
import { contracts } from "sablier/evm/contracts"; // Contracts only
```

**Data integrity:**

- Deployment broadcasts are Foundry JSON artifacts (read-only)
- CLI validates missing broadcasts, duplicate deployments
- Version management tracks `isLatest` flag per protocol

## Adding New Releases

**New protocol version:**

1. Add the checked-in release artifacts: `deployments/<protocol>/<version>/README.md`,
   `deployments/<protocol>/<version>/broadcasts/**`, and `deployments/<protocol>/<version>/artifacts/**`
2. Add the published JSON ABIs when they changed: `abi/<protocol>/<version>/*.json`
3. Add the source release module under `src/evm/releases/<protocol>/<version>/`: `manifest.ts`, `abi.ts`, `abi/*.ts`,
   `deployments.ts`, `index.ts`, and `aliases.ts` when the release has aliases
4. Register the version in `src/evm/enums.ts`
5. Register the release in `src/evm/releases/<protocol>/index.ts`
6. Flip `isLatest` in the previous latest `src/evm/releases/<protocol>/<previous-version>/index.ts` and mark the new one
   as latest
7. Update `src/evm/contracts/names.ts` so contract-name exports include the new manifest
8. Update behavior tables when the release changes semantics: `src/evm/compatibility.ts` for Airdrops/Lockup
   compatibility, `src/shapes/constants.ts` for shape-to-method mappings, and `src/evm/helpers.ts` for version-gated
   helper behavior such as payable thresholds
9. Update the few remaining version-specific tests only when their assertions change; most release-registry tests now
   iterate exported releases automatically
10. Update `CHANGELOG.md`

**New chain:**

1. Add chain definition to `src/evm/chains/definitions.ts`
2. Ensure deployment broadcasts exist for the chain
3. Run `just test` to validate
4. Add to supported chains list in `README.md`

**New contract:**

1. Add the source ABI module under the owning release, e.g. `src/evm/releases/<protocol>/<version>/abi/*.ts`
2. Add the published JSON ABI under `abi/<protocol>/<version>/` when it should ship in the package
3. Add the contract name to the release `manifest.ts` and register it in `src/evm/contracts/names.ts`
4. Add aliases and deployment wiring in the release module when the contract is deployed/queryable

## Related Repositories

- [Sablier EVM Monorepo](https://github.com/sablier-labs/lockup) - Smart contracts for Airdrops, Lockup, Flow, and Bob
- [Sablier Indexers](https://github.com/sablier-labs/indexers) - GraphQL indexers
- [Sablier UI](https://github.com/sablier-labs/ui) - Frontend application
- [Sablier Airdrops](https://github.com/sablier-labs/lockup) - Historical smart contracts (no longer maintained)
- [Sablier Flow](https://github.com/sablier-labs/flow) - Historical smart contracts (no longer maintained)
