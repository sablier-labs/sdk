import { payrollAbi } from "./abi/Payroll";
import { sablierAbi } from "./abi/Sablier";
import manifest from "./manifest";

export const abi = {
  [manifest.PAYROLL]: payrollAbi,
  [manifest.SABLIER]: sablierAbi,
};
