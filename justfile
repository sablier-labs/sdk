# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"
import "./node_modules/@sablier/devkit/just/csv.just"
import "./node_modules/@sablier/devkit/just/npm.just"

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# https://github.com/jqlang/jq
jq := require("jq")

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Default recipe
default:
    just --list

# Build the project
@build:
    just clean
    just tsc-build
alias b := build

# Clean the dist directory
@clean:
    bun x del-cli dist _cjs _esm _types
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

# Build with TypeScript CLI
@tsc-build:
    echo ""
    echo "🔨 Building the package..."

    echo ""
    echo "📦 Building CJS package..."
    bun tsc -p tsconfig.build.cjs.json
    bun tsc-alias -p tsconfig.build.cjs.json
    echo "✅ Built CJS package"

    echo ""
    echo "📦 Building ESM package..."
    bun tsc -p tsconfig.build.esm.json
    bun tsc-alias -p tsconfig.build.esm.json -f -fe .js
    echo "✅ Built ESM package"

    echo ""
    echo "📦 Building types..."
    bun tsc -p tsconfig.build.types.json
    bun tsc-alias -p tsconfig.build.types.json -f -fe .js
    echo "✅ Built types"

    echo ""
    mkdir -p _cjs _esm
    printf '{"type":"commonjs"}' > _cjs/package.json
    printf '{"type":"module","sideEffects":false}' > _esm/package.json
    echo "✅ All packages built successfully"

# ---------------------------------------------------------------------------- #
#                                     PRINT                                    #
# ---------------------------------------------------------------------------- #


# Run CLI commands. Usage: just cli <command> [args]
[private]
@cli *args:
    bun run cli {{ args }}

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
