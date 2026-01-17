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
    bunx del-cli dist
    echo "🗑️  Cleaned build files"

# Validate CSV template files
[group("checks")]
@csv-check:
    just _csv-check --glob "./csv/evm/**/*.csv"
    echo ""
    just _csv-check --glob "./csv/solana/**/*.csv"
alias cc := csv-check

# Setup Husky
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

# Build the project
@build:
    just clean
    just tsc-build
alias b := build


# Build all packages in parallel
@tsc-build:
    echo ""
    echo "🔨 Building all packages..."
    bunx concurrently --group \
        -n "cjs,esm,types" \
        -c "blue,green,yellow" \
        "just tsc-build-cjs" \
        "just tsc-build-esm" \
        "just tsc-build-types"

    echo ""
    mkdir -p dist/cjs dist/esm
    printf '{"type":"commonjs"}' > dist/cjs/package.json
    printf '{"type":"module","sideEffects":false}' > dist/esm/package.json
    echo "✅ All packages built successfully"

# Build the CJS package
@tsc-build-cjs:
    echo ""
    echo "📦 Building CJS package..."
    bun tsc -p configs/tsconfig.cjs.json
    bun tsc-alias -p configs/tsconfig.cjs.json
    echo "✅ Built CJS package"

# Build the ESM package
@tsc-build-esm:
    echo ""
    echo "📦 Building ESM package..."
    bun tsc -p configs/tsconfig.esm.json
    bun tsc-alias -p configs/tsconfig.esm.json \
        --resolve-full-paths \
        --resolve-full-extension .js
    echo "✅ Built ESM package"

# Build the types package
@tsc-build-types:
    echo ""
    echo "📦 Building types..."
    bun tsc -p configs/tsconfig.types.json
    bun tsc-alias -p configs/tsconfig.types.json \
        --resolve-full-paths \
        --resolve-full-extension .js
    echo "✅ Built types"

# ---------------------------------------------------------------------------- #
#                                     PRINT                                    #
# ---------------------------------------------------------------------------- #

# Run print CLI commands.
[group("print")]
@print-aliases:
    just cli print aliases

# Run print CLI commands.
[group("print")]
@print-chains:
    just cli print chains

# Run print CLI commands.
[group("print")]
@print-missing-broadcasts protocol:
    just cli print missing-broadcasts --protocol {{ protocol }}

# Run print CLI commands.
[group("print")]
@print-versions:
    just cli print versions

# ---------------------------------------------------------------------------- #
#                                PRIVATE HELPERS                               #
# ---------------------------------------------------------------------------- #

# Run CLI commands. Usage: just cli <command> [args]
[private]
@cli *args:
    bun run cli {{ args }}
