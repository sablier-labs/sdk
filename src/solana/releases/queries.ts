import { createReleasesQueries } from "@src/internal/factories/queries.js";
import { Protocol } from "@src/solana/enums.js";
import type { Sablier } from "@src/types.js";
import { releases } from "./data.js";

export const releasesQueries = createReleasesQueries<
  Sablier.Solana.Protocol,
  Sablier.Solana.Version,
  Sablier.Solana.Release
>({
  ProtocolEnum: Protocol,
  releases: releases as Record<Sablier.Solana.Protocol, Record<string, Sablier.Solana.Release>>,
});
