import { HttpStatus } from '@nestjs/common';
import { CpuController } from './cpu.controller';
import { CpuService } from './cpu.service';

import spyOn = jest.spyOn;

describe('CpuController', () => {
  let cpuController: CpuController;
  let cpuService: CpuService;

  beforeEach(() => {
    cpuService = new CpuService();
    cpuController = new CpuController(cpuService);
  });

  describe('get cpu information', () => {
    it('should return HttpStatus OK on success', async () => {
      const cpuData = await cpuController.getCpuData();

      expect(cpuData.status).toEqual(HttpStatus.OK);
      expect(cpuData.data).toBeDefined();
      expect(cpuData.message).toBeUndefined();
    });

    it('should return HttpStatus INTERNAL_ERROR on error', async () => {
      const errorMessage = 'Something wrong happened';
      spyOn(cpuService, 'getCpuData').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const cpuData = await cpuController.getCpuData();

      expect(cpuData.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(cpuData.data).toBeNull();
      expect(cpuData.message).toEqual(errorMessage);
    });
  });
});
