import { Injectable } from '@nestjs/common';
import { Systeminformation } from 'systeminformation';
const systeminformation = require('systeminformation');

/**
 * Service for getting cpu specific information from the host system.
 */
@Injectable()
export class CpuService {
  /**
   * Get general cpu data.
   */
  async getCpuData(): Promise<Systeminformation.CpuData> {
    try {
      return systeminformation.cpu();
    } catch (e) {
      throw e;
    }
  }
}
