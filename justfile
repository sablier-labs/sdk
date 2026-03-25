# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"
import "./node_modules/@sablier/devkit/just/csv.just"
import "./node_modules/@sablier/devkit/just/npm.just"

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Bun: https://bun.com/
bun := require("bun")
bunx := require("bunx")

# https://github.com/jqlang/jq
jq := require("jq")

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Default recipe
default:
    just --list

# Clean the dist directory
@clean:
    bunx del-cli ".logs" "dist"
    echo "🗑️  Cleaned logs and build files in ./dist"

# Verify dist files don't contain unresolved @/src imports
[group("checks")]
@aliases-check:
    echo "🔍 Checking for unresolved @/src imports..."
    if rg --quiet "@/src/" dist -g "*.js" -g "*.d.ts"; then echo "❌ Found path aliases in dist/"; exit 1; fi
    echo "✅ No @/src imports found in dist/"

# Validate CSV template files
[group("checks")]
@csv-check:
    just _csv-check --glob "./csv/evm/**/*.csv"
    echo ""
    just _csv-check --glob "./csv/solana/**/*.csv"
alias cc := csv-check

# Setup Husky; do it when cloning the repo!
@setup:
    bun husky

# Run tests
@test *args:
    bun vitest run {{args}}
alias t := test

# Run tests with UI
@test-ui *args:
    bun vitest --ui {{args}}
alias tui := test-ui

# ---------------------------------------------------------------------------- #
#                                     BUILD                                    #
# ---------------------------------------------------------------------------- #

# Run the complete build pipeline
#   1. Clean build files
#   2. Build all packages (CJS, ESM, types)
[group("build")]
@build:
    just --quiet clean
    echo "🗑️  Cleaned build files"
    echo ""

    echo "🔨 Building all packages..."
    just tsc-build
    echo ""
    echo "✅ All packages built successfully"
alias b := build

# Build all packages in parallel
[group("build")]
@tsc-build:
    bunx concurrently --group \
        -n "cjs,esm,types" \
        -c "blue,green,yellow" \
        "just tsc-build-cjs" \
        "just tsc-build-esm" \
        "just tsc-build-types"

    # Verify dist files don't contain unresolved alias imports
    just --quiet aliases-check || (echo "❌ Found path aliases in dist/"; exit 1)

    # Create package.json files for CJS and ESM
    mkdir -p dist/cjs dist/esm
    printf '{"type":"commonjs"}' > dist/cjs/package.json
    printf '{"type":"module","sideEffects":false}' > dist/esm/package.json

# Build the CJS package
[group("build")]
@tsc-build-cjs:
    echo ""
    echo "📦 Building CJS package..."
    bun tsc -p configs/tsconfig.cjs.json
    just _tsc-alias configs/tsconfig.cjs.json
    echo "✅ Built CJS package"

# Build the ESM package
[group("build")]
@tsc-build-esm:
    echo ""
    echo "📦 Building ESM package..."
    bun tsc -p configs/tsconfig.esm.json
    just _tsc-alias configs/tsconfig.esm.json
    echo "✅ Built ESM package"

# Build the types package
[group("build")]
@tsc-build-types:
    echo ""
    echo "📦 Building types..."
    bun tsc -p configs/tsconfig.types.json
    just _tsc-alias configs/tsconfig.types.json
    echo "✅ Built types"

# Helper for running tsc-alias on a project
@_tsc-alias project:
    bun tsc-alias -p {{ project }} \
        --resolve-full-extension .js \
        --resolve-full-paths

# ---------------------------------------------------------------------------- #
#                                     CLI                                      #
# ---------------------------------------------------------------------------- #

# Generate TypeScript ABI files from JSON ABIs.
[group("cli")]
@generate-abis *args:
    bun scripts/generate-abis.ts {{args}}
    just biome-write src/evm/releases
    echo "✅ Generated TypeScript ABI files"

# Run print CLI commands.
[group("cli")]
@print-aliases:
    just cli print aliases

# Run print CLI commands.
[group("cli")]
@print-chains:
    just cli print chains

# Run print CLI commands.
[group("cli")]
@print-missing-broadcasts protocol:
    just cli print missing-broadcasts --protocol {{ protocol }}

# Run print CLI commands.
[group("cli")]
@print-versions:
    just cli print versions

# ---------------------------------------------------------------------------- #
#                                PRIVATE HELPERS                               #
# ---------------------------------------------------------------------------- #

# Run CLI commands. Usage: just cli <command> [args]
[private]
@cli *args:
    bunx tsx cli {{ args }}
