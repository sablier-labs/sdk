import { Protocol } from "@src/enums";
import type { Sablier } from "@src/types";
import _ from "lodash";
import { releases } from "./data";

export const releasesQueries = {
  get: (opts: { protocol: Sablier.Protocol; version: Sablier.Version }): Sablier.Release | undefined => {
    const { protocol, version } = opts;
    return _.get(releases, [protocol, version]);
  },
  /**
   * Get all releases for a protocol.
   * - {}                  ⇒ all releases for all protocols
   * - {protocol}          ⇒ all releases for that protocol
   */
  getAll: (opts?: { protocol?: Sablier.Protocol }): Sablier.Release[] => {
    const { protocol } = opts || {};
    if (protocol) {
      return _.flatMap(_.values(releases[protocol]));
    }
    // Recursively get all releases from all protocols in the enum
    return _.flatMap(Object.values(Protocol), (protocolName) => _.flatMap(_.values(releases[protocolName])));
  },
  /**
   * Get the first release:
   * - {protocol}          ⇒ first overall
   * - {protocol,chainId}  ⇒ first on that chain
   */
  getFirst: (opts: { protocol: Sablier.Protocol; chainId?: number }): Sablier.Release | undefined => {
    const { protocol, chainId } = opts;
    const list = releases[protocol];

    if (chainId) {
      return _.find(list, (r) => _.some(r.deployments, { chainId }));
    }

    return _.values(list)[0];
  },
  /**
   * Get the latest release for a protocol.
   * - {protocol}
   */
  getLatest: (opts: { protocol: Sablier.Protocol }): Sablier.Release => {
    const list = _.values(releases[opts.protocol]);
    const latest = list[list.length - 1];
    if (!latest.isLatest) {
      throw new Error(`No latest release found for Sablier ${opts.protocol}. Please report on GitHub.`);
    }
    return latest;
  },
};
