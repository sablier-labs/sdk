/**
 * Get a nested value from an object by path.
 * @example
 * getPath(obj, ["a", "b", "c"]) // obj.a.b.c
 */
export function getPath<T>(obj: unknown, path: readonly (string | number)[]): T | undefined {
  let result: unknown = obj;
  for (const key of path) {
    if (result == null) {
      return undefined;
    }
    result = (result as Record<string | number, unknown>)[key];
  }
  return result as T | undefined;
}

/**
 * Set a nested value in an object by path, creating intermediate objects as needed.
 * Mutates and returns the original object.
 * @example
 * setPath(obj, ["a", "b", "c"], value) // obj.a.b.c = value
 */
export function setPath<T extends object>(
  obj: T,
  path: readonly (string | number)[],
  value: unknown
): T {
  if (path.length === 0) {
    return obj;
  }
  let current: Record<string | number, unknown> = obj as Record<string | number, unknown>;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (current[key] == null) {
      current[key] = {};
    }
    current = current[key] as Record<string | number, unknown>;
  }
  const lastKey = path.at(-1);
  if (lastKey === undefined) {
    return obj;
  }
  current[lastKey] = value;
  return obj;
}
