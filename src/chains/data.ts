import { mainnets } from "./mainnets";
import { testnets } from "./testnets";

export { mainnets, testnets };
export const chains = { ...mainnets, ...testnets };
