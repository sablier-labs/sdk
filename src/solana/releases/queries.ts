import { createReleasesQueries } from "@src/internal/factories/queries";
import { Protocol } from "@src/solana/enums";
import type { Sablier } from "@src/types";
import { releases } from "./data";

export const releasesQueries = createReleasesQueries<
  Sablier.Solana.Protocol,
  Sablier.Solana.Version,
  Sablier.Solana.Release
>({
  ProtocolEnum: Protocol,
  releases: releases as Record<Sablier.Solana.Protocol, Record<string, Sablier.Solana.Release>>,
});
