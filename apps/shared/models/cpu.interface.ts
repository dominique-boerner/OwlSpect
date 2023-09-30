import { CpuInfo } from "os";
import { ConnectorResponse } from "./connector-response.interface";

export type CpuSpeed = {
  averageSpeedMhz: number;
  averageSpeedGhz: number;
};

export type CpuResponse = ConnectorResponse<{
  cpus: CpuInfo[];
  averageSpeed: CpuSpeed;
}>;
