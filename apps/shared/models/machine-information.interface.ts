import os from "node:os";
import { NetworkInterfaceInfo } from "os";

export type Os = "Linux" | "Darin" | "Windows_NT";

export type Network = NodeJS.Dict<NetworkInterfaceInfo[]>;

/**
 * Basic information about the current machine.
 */
export interface MachineInformation {
  hostname: string;
  plattform: NodeJS.Platform;
  release: string;
  os: Os;
  uptime: number;
  version: string;
}
