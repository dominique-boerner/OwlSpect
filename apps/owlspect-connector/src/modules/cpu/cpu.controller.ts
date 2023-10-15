import { Controller, Get } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { StatusCodes } from 'http-status-codes';
import { CpuResponse } from '../../../../shared/models/cpu.interface';

@Controller({
  path: 'cpu',
})
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  @Get()
  async getCpuData(): Promise<CpuResponse> {
    try {
      const data = await this.cpuService.getCpuData();
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
