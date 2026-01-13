import { payrollAbi } from "./abi/Payroll.js";
import { sablierAbi } from "./abi/Sablier.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.PAYROLL]: payrollAbi,
  [manifest.SABLIER]: sablierAbi,
} as const;
