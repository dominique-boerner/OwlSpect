import { ApiResponse } from "./api-response.interface";
import { Systeminformation } from "systeminformation";

/**
 * Information about the cpu speed
 */
export type Speed = {
  min: number;
  max: number;
};

/**
 * Information about cpu cache
 */
export type Cache = {
  l1: number;
  l2: number;
  l3: number;
};

/**
 * Information about the cpu cores
 */
export type Cores = {
  physical: number;
  logical: number;
};

/**
 * Contains information about the cpu of the host system.
 */
export type Cpu = {
  manufacturer: string;
  brand: string;
  voltage: string;
  speed: Speed;
  cores: Cores;
  socket: string;
  virtualization: boolean;
  cache: Cache;
};

/**
 * Represents the response, which is sent from the API if cpu is called.
 */
export type CpuResponse = ApiResponse<Cpu>;
