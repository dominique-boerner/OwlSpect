import { Injectable } from '@nestjs/common';
import { Systeminformation } from 'systeminformation';
const si = require('systeminformation');

@Injectable()
export class CpuService {
  /**
   * Get general cpu data.
   */
  async getCpuData(): Promise<Systeminformation.CpuData> {
    try {
      return si.cpu();
    } catch (e) {
      throw e;
    }
  }
}
