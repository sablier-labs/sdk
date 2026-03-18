import * as fs from "node:fs";
import * as path from "node:path";
import { releases } from "@/src/evm/releases/index.js";
import { getDeploymentsDir } from "@/src/internal/helpers.js";
import type { Sablier } from "@/src/types.js";

const evmReleases = releases as Record<Sablier.EVM.Protocol, Record<string, Sablier.EVM.Release>>;

export type EvmContractEntry = {
  contract: Sablier.EVM.Contract;
  deployment: Sablier.EVM.Deployment;
  release: Sablier.EVM.Release;
};

export type AliasedEvmContractEntry = Omit<EvmContractEntry, "contract"> & {
  contract: Sablier.EVM.Contract & { alias: string };
};

export const allEvmReleases = Object.values(evmReleases).flatMap((byVersion) =>
  Object.values(byVersion)
);

export const allEvmContractEntries: EvmContractEntry[] = allEvmReleases.flatMap((release) =>
  release.deployments.flatMap((deployment) =>
    deployment.contracts.map((contract) => ({ contract, deployment, release }))
  )
);

export const allAliasedEvmContractEntries: AliasedEvmContractEntry[] = allEvmContractEntries.filter(
  (entry): entry is AliasedEvmContractEntry => Boolean(entry.contract.alias)
);

export function hasDeploymentArtifacts(release: Sablier.EVM.Release): boolean {
  return fs.existsSync(path.join(getDeploymentsDir(), release.protocol, release.version));
}

export function getProtocolEvmReleases(protocol: Sablier.EVM.Protocol): Sablier.EVM.Release[] {
  return Object.values(evmReleases[protocol]);
}

export function getProtocolEvmReleasesWithArtifacts(
  protocol: Sablier.EVM.Protocol
): Sablier.EVM.Release[] {
  return getProtocolEvmReleases(protocol).filter(hasDeploymentArtifacts);
}

export const evmReleasesWithDeploymentArtifacts = allEvmReleases.filter(hasDeploymentArtifacts);
