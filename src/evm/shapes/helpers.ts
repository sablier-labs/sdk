import type { EVM } from "../types";
import { Shape } from "./enums";
import type {
  AirdropShapeDefinition,
  ContractMethod,
  FlowShapeDefinition,
  LockupShapeDefinition,
} from "./types";

type AnyShape = LockupShapeDefinition | FlowShapeDefinition | AirdropShapeDefinition;

/** All Lockup shape IDs */
export const lockupShapeIds = Object.values(Shape.Lockup);

/** All Flow shape IDs */
export const flowShapeIds = Object.values(Shape.Flow);

/** All Airdrop shape IDs */
export const airdropShapeIds = Object.values(Shape.Airdrops);

/**
 * Get all shapes available for a specific protocol version.
 * Returns shapes that have at least one contract mapping for the given version.
 */
export function getShapesByVersion<T extends AnyShape>(
  shapes: Record<string, T>,
  version: EVM.Version,
): T[] {
  return Object.values(shapes).filter((shape) =>
    shape.contracts.some((c) => c.version === version),
  );
}

/**
 * Get contract methods for a shape filtered by version.
 * Returns undefined if the shape doesn't support the version.
 */
export function getContractMethodsForVersion(
  shape: AnyShape,
  version: EVM.Version,
): ContractMethod | undefined {
  return shape.contracts.find((c) => c.version === version);
}

/**
 * Check if a shape is available in a specific version.
 */
export function isShapeAvailableInVersion(shape: AnyShape, version: EVM.Version): boolean {
  return shape.contracts.some((c) => c.version === version);
}

/**
 * Get the latest version contract mapping for a shape.
 * Assumes contracts are ordered newest first.
 */
export function getLatestContractMethod(shape: AnyShape): ContractMethod {
  if (!shape.contracts || shape.contracts.length === 0) {
    throw new Error(`Shape "${shape.id}" has no contract mappings`);
  }
  return shape.contracts[0];
}

/**
 * Type guard to check if a value is a valid Lockup shape ID.
 */
export function isLockupShape(value: unknown): value is Shape.Lockup {
  return lockupShapeIds.includes(value as Shape.Lockup);
}

/**
 * Type guard to check if a value is a valid Flow shape ID.
 */
export function isFlowShape(value: unknown): value is Shape.Flow {
  return flowShapeIds.includes(value as Shape.Flow);
}

/**
 * Type guard to check if a value is a valid Airdrop shape ID.
 */
export function isAirdropShape(value: unknown): value is Shape.Airdrops {
  return airdropShapeIds.includes(value as Shape.Airdrops);
}
