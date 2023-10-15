import { Injectable } from '@nestjs/common';
import { Systeminformation } from 'systeminformation';
const systeminformation = require('systeminformation');

/**
 * Service for getting memory specific information from the host system.
 */
@Injectable()
export class MemoryService {
  /**
   * Get general memory data.
   */
  async getMemoryData(): Promise<Systeminformation.MemData> {
    try {
      return systeminformation.mem();
    } catch (e) {
      throw e;
    }
  }
}
