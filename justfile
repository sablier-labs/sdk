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
    bun x del-cli dist
    echo "🗑️  Cleaned build files"

# Setup Husky
setup:
    bun husky

# Run tests
test *args:
    bun vitest run {{args}}
alias t := test

# Validate CSV template files
[group("checks")]
@csv-check:
    just _csv-check "./src/evm/csv/schemas/**/*.csv"
    echo ""
    just _csv-check "./src/solana/csv/schemas/*.csv"
alias cc := csv-check

# Run tests with UI
test-ui *args:
    bun vitest --ui {{args}}
alias tui := test-ui

# Build with TypeScript CLI
@tsc-build:
    echo "🔨 Building the package..."
    bun tsc -p tsconfig.build.json
    bun tsc-alias -p tsconfig.build.json
    bun copyfiles --up 3 src/evm/abi/**/*.json "dist/abi"
    bun copyfiles --up 1 "src/csv/schemas/**/*.schema.json" dist
    echo "✅ Package built successfully in 'dist' directory"

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

