import { releases } from "@/src/solana/releases/index.js";
import type { Sablier } from "@/src/types.js";

const solanaReleases = releases as Record<
  Sablier.Solana.Protocol,
  Record<string, Sablier.Solana.Release>
>;

export type SolanaProgramEntry = {
  deployment: Sablier.Solana.Deployment;
  program: Sablier.Solana.Program;
  release: Sablier.Solana.Release;
};

export type AliasedSolanaProgramEntry = Omit<SolanaProgramEntry, "program"> & {
  program: Sablier.Solana.Program & { alias: string };
};

export const allSolanaReleases = Object.values(solanaReleases).flatMap((byVersion) =>
  Object.values(byVersion)
);

export const allSolanaProgramEntries: SolanaProgramEntry[] = allSolanaReleases.flatMap((release) =>
  release.deployments.flatMap((deployment) =>
    deployment.programs.map((program) => ({ deployment, program, release }))
  )
);

export const allAliasedSolanaProgramEntries: AliasedSolanaProgramEntry[] =
  allSolanaProgramEntries.filter((entry): entry is AliasedSolanaProgramEntry =>
    Boolean(entry.program.alias)
  );
