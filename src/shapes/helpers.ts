import type { EVM } from "@src/evm/types";
import type { Solana } from "@src/solana/types";
import { Shape } from "./enums";
import type { AnyShape, ContractMethod, ProgramMethod, ShapeWithSolanaSupport } from "./types";

/* -------------------------------------------------------------------------- */
/*                              SHAPE ID ARRAYS                               */
/* -------------------------------------------------------------------------- */

/** All Lockup shape IDs */
export const lockupShapeIds = Object.values(Shape.Lockup);

/** All Flow shape IDs */
export const flowShapeIds = Object.values(Shape.Flow);

/** All Airdrop shape IDs */
export const airdropShapeIds = Object.values(Shape.Airdrops);

/** Lockup shapes with Solana support */
export const solanaLockupShapeIds = [
  Shape.Lockup.Linear,
  Shape.Lockup.Cliff,
  Shape.Lockup.LinearUnlockLinear,
  Shape.Lockup.LinearUnlockCliff,
  Shape.Lockup.LinearTimelock,
] as const;

/** Airdrop shapes with Solana support */
export const solanaAirdropShapeIds = [Shape.Airdrops.Instant] as const;

/* -------------------------------------------------------------------------- */
/*                             EVM HELPER FUNCTIONS                           */
/* -------------------------------------------------------------------------- */

/**
 * Get all shapes available for a specific EVM protocol version.
 * Returns shapes that have at least one evm entry for the given version.
 *
 * @param shapes - Record of shapes to filter
 * @param version - EVM protocol version to filter by
 * @returns Array of shapes that support the version
 */
export function getEvmShapesByVersion<T extends AnyShape>(
  shapes: Record<string, T>,
  version: EVM.Version,
): T[] {
  return Object.values(shapes).filter((shape) => shape.evm.some((c) => c.version === version));
}

/**
 * Get EVM contract methods for a shape filtered by version.
 * Returns undefined if the shape doesn't support the version.
 *
 * @param shape - Shape to query
 * @param version - EVM protocol version to find
 * @returns Contract method entry or undefined if not found
 */
export function getEvmContractMethodsForVersion(
  shape: AnyShape,
  version: EVM.Version,
): ContractMethod | undefined {
  return shape.evm.find((c) => c.version === version);
}

/**
 * Check if a shape is available in a specific EVM version.
 *
 * @param shape - Shape to check
 * @param version - EVM protocol version to check
 * @returns True if the shape has at least one evm entry for the version
 */
export function isEvmShapeAvailableInVersion(shape: AnyShape, version: EVM.Version): boolean {
  return shape.evm.some((c) => c.version === version);
}

/**
 * Get the latest EVM version contract mapping for a shape.
 * Assumes evm entries are ordered newest first.
 *
 * @param shape - Shape to query
 * @returns Latest contract method entry
 * @throws Error if shape has no evm entries
 */
export function getLatestEvmContractMethod(shape: AnyShape): ContractMethod {
  if (!shape.evm || shape.evm.length === 0) {
    throw new Error(`Shape "${shape.id}" has no EVM contract mappings`);
  }
  return shape.evm[0];
}

/* -------------------------------------------------------------------------- */
/*                           SOLANA HELPER FUNCTIONS                          */
/* -------------------------------------------------------------------------- */

/**
 * Get all shapes available for a specific Solana protocol version.
 * Returns shapes that have at least one solana entry for the given version.
 *
 * @param shapes - Record of shapes to filter
 * @param version - Solana protocol version to filter by
 * @returns Array of shapes that support the version
 */
export function getSolanaShapesByVersion<T extends ShapeWithSolanaSupport>(
  shapes: Record<string, T>,
  version: Solana.Version,
): T[] {
  return Object.values(shapes).filter((shape) => shape.solana?.some((p) => p.version === version));
}

/**
 * Get Solana program methods for a shape filtered by version.
 * Returns undefined if the shape doesn't support the version.
 *
 * @param shape - Shape to query
 * @param version - Solana protocol version to find
 * @returns Program method entry or undefined if not found
 */
export function getSolanaProgramMethodsForVersion(
  shape: ShapeWithSolanaSupport,
  version: Solana.Version,
): ProgramMethod | undefined {
  return shape.solana?.find((p) => p.version === version);
}

/**
 * Check if a shape is available in a specific Solana version.
 *
 * @param shape - Shape to check
 * @param version - Solana protocol version to check
 * @returns True if the shape has at least one solana entry for the version
 */
export function isSolanaShapeAvailableInVersion(
  shape: ShapeWithSolanaSupport,
  version: Solana.Version,
): boolean {
  return shape.solana?.some((p) => p.version === version) ?? false;
}

/**
 * Get the latest Solana version program mapping for a shape.
 * Assumes solana entries are ordered newest first.
 *
 * @param shape - Shape to query
 * @returns Latest program method entry
 * @throws Error if shape has no solana entries
 */
export function getLatestSolanaProgramMethod(shape: ShapeWithSolanaSupport): ProgramMethod {
  if (!shape.solana || shape.solana.length === 0) {
    throw new Error(`Shape "${shape.id}" has no Solana program mappings`);
  }
  return shape.solana[0];
}

/* -------------------------------------------------------------------------- */
/*                               TYPE GUARDS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Type guard to check if a value is a valid Lockup shape ID.
 *
 * @param value - Value to check
 * @returns True if value is a Lockup shape identifier
 */
export function isLockupShape(value: unknown): value is Shape.Lockup {
  return lockupShapeIds.includes(value as Shape.Lockup);
}

/**
 * Type guard to check if a value is a valid Flow shape ID.
 *
 * @param value - Value to check
 * @returns True if value is a Flow shape identifier
 */
export function isFlowShape(value: unknown): value is Shape.Flow {
  return flowShapeIds.includes(value as Shape.Flow);
}

/**
 * Type guard to check if a value is a valid Airdrop shape ID.
 *
 * @param value - Value to check
 * @returns True if value is an Airdrop shape identifier
 */
export function isAirdropShape(value: unknown): value is Shape.Airdrops {
  return airdropShapeIds.includes(value as Shape.Airdrops);
}

/**
 * Type guard to check if a shape has Solana support.
 *
 * @param shape - Shape to check
 * @returns True if shape has solana field with at least one entry
 */
export function hasSolanaSupport(shape: AnyShape): shape is ShapeWithSolanaSupport {
  return "solana" in shape && Array.isArray(shape.solana) && shape.solana.length > 0;
}

/**
 * Type guard to check if a Lockup shape has Solana support.
 *
 * @param value - Lockup shape ID to check
 * @returns True if the Lockup shape is supported on Solana
 */
export function hasSolanaLockupSupport(
  value: Shape.Lockup,
): value is (typeof solanaLockupShapeIds)[number] {
  return solanaLockupShapeIds.includes(value as (typeof solanaLockupShapeIds)[number]);
}

/**
 * Type guard to check if an Airdrop shape has Solana support.
 *
 * @param value - Airdrop shape ID to check
 * @returns True if the Airdrop shape is supported on Solana
 */
export function hasSolanaAirdropSupport(
  value: Shape.Airdrops,
): value is (typeof solanaAirdropShapeIds)[number] {
  return solanaAirdropShapeIds.includes(value as (typeof solanaAirdropShapeIds)[number]);
}
