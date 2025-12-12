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
bun cli             # Show CLI help
bun cli print       # Print deployment info
```

### Testing

- **Local**: 10s timeout, no retries
- **CI**: 60s timeout, 10 retries for flaky RPC calls
- **Cron tests**: Separate suite in `tests/cron/` for scheduled CI runs

Run cron tests locally:

```bash
just test tests/cron
```

## Build System

Uses `just` + Bun + TypeScript:

1. Clean `dist/` directory
2. Compile with `tsc` (using `tsconfig.build.json`)
3. Resolve path aliases with `tsc-alias`
4. Copy `src/abi/*.json` to `dist/abi/`

**Path aliases:**

- `@src/*` → `src/*`
- `@cli/*` → `cli/*`

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

## Adding New Features

**New protocol version:**

1. Add deployment broadcasts to `deployments/<protocol>/`
2. Update `src/evm/releases/<protocol>.ts` with new version
3. Run tests to validate deployment structure
4. Update `CHANGELOG.md`

**New chain:**

1. Add chain definition to `src/evm/chains/definitions.ts`
2. Ensure deployment broadcasts exist for the chain
3. Run `just test` to validate
4. Add to supported chains list in `README.md`

**New contract:**

1. Add ABI JSON to `src/abi/` (auto-copied during build)
2. Update contract names enum in `src/evm/enums.ts`
3. Add contract handling in `src/evm/contracts/`
4. Export via `src/index.ts`

## Troubleshooting

**Build failures:**

- Check `tsconfig.build.json` for path resolution issues
- Verify `src/abi/` files are valid JSON
- Run `just clean` and rebuild

**Test timeouts:**

- RPC endpoints may be rate-limited or slow
- Increase timeout in `vitest.config.ts` or use CI retry logic
- Check `.env.example` for required environment variables

**Type errors:**

- Run `just tsc-check` for detailed output
- Verify Viem version compatibility (peer dependency `^2.32`)
- Check path alias resolution with `tsc-alias`

**CLI not working:**

- Run `just build` first (CLI imports from `dist/`)
- Check `cli/index.ts` for command registration
- Use `bun cli --help` for usage

## Related Repositories

- [Sablier Airdrops](https://github.com/sablier-labs/airdrops) - Smart contracts
- [Sablier Lockup](https://github.com/sablier-labs/lockup) - Smart contracts
- [Sablier Flow](https://github.com/sablier-labs/flow) - Smart contracts
- [Sablier Indexers](https://github.com/sablier-labs/indexers) - GraphQL indexers
- [Sablier Interface](https://github.com/sablier-labs/interface) - Frontend app
