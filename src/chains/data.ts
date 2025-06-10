import * as mainnets from "./mainnets";
import * as testnets from "./testnets";

export { mainnets, testnets };
export const chains = { ...mainnets, ...testnets };
