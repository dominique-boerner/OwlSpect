import { Injectable, Logger } from '@nestjs/common';
import { Cores, Cpu, Speed } from '../../../../shared/models/cpu.interface';
import { Systeminformation } from 'systeminformation';

const systeminformation = require('systeminformation');

/**
 * Service for getting cpu specific information from the host system.
 */
@Injectable()
export class CpuService {
  private readonly logger = new Logger(CpuService.name);

  /**
   * Get general cpu data.
   */
  async calculateCpuInformation(): Promise<Cpu> {
    try {
      this.logger.log('Start collection CPU information');

      const cpuInformation: Systeminformation.CpuData =
        await systeminformation.cpu();

      const [speed, cores, cache] = await Promise.all([
        this.calculateSpeed(cpuInformation),
        this.calculateCores(cpuInformation),
        this.calculateCache(cpuInformation),
      ]);

      this.logger.log('Finished collection of CPU information');
      return {
        manufacturer: cpuInformation.manufacturer,
        brand: cpuInformation.brand,
        voltage: cpuInformation.voltage,
        socket: cpuInformation.socket,
        virtualization: cpuInformation.virtualization,
        cache,
        speed,
        cores,
      };
    } catch (e) {
      this.logger.log('Error while getting CPU information: %s', e.message);
      throw e;
    }
  }

  private async calculateCache(cpuInformation: Systeminformation.CpuData) {
    this.logger.debug('Calculating cache information');
    return {
      l1: cpuInformation.cache.l1i + cpuInformation.cache.l1d,
      l2: cpuInformation.cache.l2,
      l3: cpuInformation.cache.l3,
    };
  }

  private async calculateCores(
    cpuInformation: Systeminformation.CpuData,
  ): Promise<Cores> {
    this.logger.debug('Calculating core information');
    return {
      physical: cpuInformation.physicalCores,
      logical: cpuInformation.cores,
    };
  }

  private async calculateSpeed(
    cpuInformation: Systeminformation.CpuData,
  ): Promise<Speed> {
    this.logger.debug('Calculating speed information');
    return {
      min: cpuInformation.speedMin,
      max: cpuInformation.speedMax,
    };
  }
}
