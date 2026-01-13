export function sortChains<T extends { name: string }>(chains: T[]): T[] {
  return chains.toSorted((a, b) => a.name.localeCompare(b.name));
}
