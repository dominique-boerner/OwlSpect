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
      validateCpuModel(cpuData);
      expect(cpuData.message).toBeUndefined();
    }, 10000);

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

  function validateCpuModel(cpuData) {
    expect(typeof cpuData.data.manufacturer).toBe('string');
    expect(typeof cpuData.data.brand).toBe('string');
    expect(typeof cpuData.data.voltage).toBe('string');
    expect(typeof cpuData.data.speed.min).toBe('number');
    expect(typeof cpuData.data.speed.max).toBe('number');
    expect(typeof cpuData.data.cores.logical).toBe('number');
    expect(typeof cpuData.data.cores.physical).toBe('number');
    expect(typeof cpuData.data.socket).toBe('string');
    expect(typeof cpuData.data.virtualization).toBe('boolean');
    expect(typeof cpuData.data.cache.l1).toBe('number');
    expect(typeof cpuData.data.cache.l2).toBe('number');
    expect(typeof cpuData.data.cache.l3).toBe('number');
  }
});
