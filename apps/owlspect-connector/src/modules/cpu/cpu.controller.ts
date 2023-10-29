import { Controller, Get } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { StatusCodes } from 'http-status-codes';
import { CpuResponse } from '../../../../shared/models/cpu.interface';

/**
 * Controller for retrieving CPU specific information from the host system.
 */
@Controller({
  path: 'cpu',
})
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  /**
   * Get CPU information from the host system.
   *
   * @example
   * // Get cpu information
   * GET http://localhost:3001/cpu
   */
  @Get()
  async getCpuData(): Promise<CpuResponse> {
    try {
      const data = await this.cpuService.calculateCpuInformation();
      return {
        status: StatusCodes.OK,
        data,
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          data: null,
          message: e.message,
        };
      }
    }
  }
}
