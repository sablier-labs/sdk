import { chainsQueries } from "@src/chains/queries";
import _ from "lodash";

export function getNestedValues<T extends Record<string, unknown>>(obj: T): string[] {
  return _.flatMap(obj, (value) => {
    if (_.isObject(value) && !_.isArray(value)) {
      return getNestedValues(value as Record<string, unknown>);
    }
    return _.isString(value) ? value : [];
  });
}

export function sortDeployments<T extends { chainId: number }>(deployments: T[]): T[] {
  return deployments.sort((a, b) => {
    const aChain = chainsQueries.getOrThrow(a.chainId);
    const bChain = chainsQueries.getOrThrow(b.chainId);
    return aChain.name.localeCompare(bChain.name);
  });
}
