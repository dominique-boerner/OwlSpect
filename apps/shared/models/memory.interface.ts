import { ApiResponse } from "./api-response.interface";
import { Systeminformation } from "systeminformation";

/**
 * Contains information about the memory of the host system.
 */
type Memory = Systeminformation.MemData;

/**
 * Represents the response, which is sent from the API if memory is called.
 */
export type MemoryResponse = ApiResponse<Memory>;
