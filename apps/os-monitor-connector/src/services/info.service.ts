import os from "node:os";
import { Os } from "../../../shared/models/machine-information.interface";

/**
 * Get the hostname current system.
 */
async function getHostname(): Promise<string> {
  return os.hostname();
}

/**
 * Get the os of the current system.
 */
async function getOs(): Promise<Os> {
  return os.type() as Os;
}

/**
 * Get the release of the current system.
 */
async function getRelease(): Promise<string> {
  return os.release();
}

/**
 * Get the uptime of the current system.
 */
async function getUptime(): Promise<number> {
  return os.uptime();
}

/**
 * Get the release of the current system.
 */
async function getVersion(): Promise<string> {
  return os.version();
}

/**
 * Get the plattform of the current system.
 */
async function getPlattform(): Promise<NodeJS.Platform> {
  return os.platform();
}

export default {
  getHostname,
  getOs,
  getRelease,
  getUptime,
  getVersion,
  getPlattform,
};
