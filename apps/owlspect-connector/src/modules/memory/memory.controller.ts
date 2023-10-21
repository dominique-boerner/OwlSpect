import { Controller, Get } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { StatusCodes } from 'http-status-codes';
import { MemoryResponse } from '../../../../shared/models/memory.interface';

/**
 * Controller for retrieving memory specific information from the host system.
 */
@Controller({
  path: 'memory',
})
export class MemoryController {
  constructor(private readonly cpuService: MemoryService) {}

  /**
   * Get memory information from the host system.
   *
   * @example
   * // Get memory information
   * GET http://localhost:3001/memory
   */
  @Get()
  async getMemoryData(): Promise<MemoryResponse> {
    try {
      const data = await this.cpuService.getMemoryData();
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
