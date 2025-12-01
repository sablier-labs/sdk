import { Protocol } from "@src/evm/enums";
import { createReleasesQueries } from "@src/internal/factories/queries";
import type { Sablier } from "@src/types";
import { releases } from "./data";

export const releasesQueries = createReleasesQueries<
  Sablier.EVM.Protocol,
  Sablier.EVM.Version,
  Sablier.EVM.Release
>({
  ProtocolEnum: Protocol,
  releases: releases as Record<Sablier.EVM.Protocol, Record<string, Sablier.EVM.Release>>,
});
