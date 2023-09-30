import { Controller, Get } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { StatusCodes } from 'http-status-codes';
import { MemoryResponse } from './memory.interface';

@Controller({
  path: 'memory',
})
export class MemoryController {
  constructor(private readonly cpuService: MemoryService) {}

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
