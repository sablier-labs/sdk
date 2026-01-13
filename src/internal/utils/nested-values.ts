export function getNestedValues<T extends Record<string, unknown>>(obj: T): string[] {
  return Object.values(obj).flatMap((value) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return getNestedValues(value as Record<string, unknown>);
    }
    return typeof value === "string" ? value : [];
  });
}
