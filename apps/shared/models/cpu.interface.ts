import { ApiResponse } from "./api-response.interface";
import { Systeminformation } from "systeminformation";

/**
 * Contains information about the cpu of the host system.
 */
type Cpu = Systeminformation.CpuData;

/**
 * Represents the response, which is sent from the API if cpu is called.
 */
export type CpuResponse = ApiResponse<Cpu>;
