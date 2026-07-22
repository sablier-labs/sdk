import { expect } from "vitest";

/**
 * Asserts that `entry` is defined and returns it narrowed, throwing `message` otherwise.
 */
export function expectEntry<T>(entry: T | undefined, message: string): T {
  expect(entry).toBeDefined();
  if (!entry) {
    throw new Error(message);
  }

  return entry;
}
