import os from "node:os";
import { Memory } from "../../../shared/models/memory.interface.ts";

async function getMemory(): Promise<Memory> {
  try {
    const freemem = await getFreeMemory();
    const totalmem = os.totalmem();
    const usage = os.freemem() / os.totalmem();

    return {
      freemem,
      totalmem,
      usage,
    };
  } catch (e) {
    throw e;
  }
}

async function getFreeMemory(): Promise<number> {
  try {
    return os.freemem();
  } catch (e) {
    throw e;
  }
}

export default {
  getMemory,
  getFreeMemory,
};
