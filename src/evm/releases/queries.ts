import { Protocol } from "@src/evm/enums.js";
import { createReleasesQueries } from "@src/internal/factories/queries.js";
import type { Sablier } from "@src/types.js";
import { releases } from "./data.js";

export const releasesQueries = createReleasesQueries<
  Sablier.EVM.Protocol,
  Sablier.EVM.Version,
  Sablier.EVM.Release
>({
  ProtocolEnum: Protocol,
  releases: releases as Record<Sablier.EVM.Protocol, Record<string, Sablier.EVM.Release>>,
});
