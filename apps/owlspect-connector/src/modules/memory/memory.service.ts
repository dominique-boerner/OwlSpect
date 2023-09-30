import { Injectable } from '@nestjs/common';
import { Systeminformation } from 'systeminformation';
const si = require('systeminformation');

@Injectable()
export class MemoryService {
  /**
   * Get general memory data.
   */
  async getMemoryData(): Promise<Systeminformation.MemData> {
    try {
      return si.mem();
    } catch (e) {
      throw e;
    }
  }
}
