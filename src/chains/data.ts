import type { Sablier } from "@src/types";
import * as mainnetsModule from "./mainnets";
import * as testnetsModule from "./testnets";

export const mainnets = mainnetsModule satisfies Record<string, Sablier.Chain>;
export const testnets = testnetsModule satisfies Record<string, Sablier.Chain>;
export const chains = { ...mainnets, ...testnets };
