import type { EVM } from "../types";
import type { AirdropShape, ContractMethod, FlowShape, LockupShape } from "./types";

type AnyShape = LockupShape | FlowShape | AirdropShape;

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
  return shape.contracts[0];
}
