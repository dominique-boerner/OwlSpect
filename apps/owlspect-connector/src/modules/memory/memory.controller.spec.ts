import { HttpStatus } from '@nestjs/common';
import { MemoryController } from './memory.controller';
import { MemoryService } from './memory.service';

import spyOn = jest.spyOn;

describe('MemoryController', () => {
  let memoryController: MemoryController;
  let memoryService: MemoryService;

  beforeEach(() => {
    memoryService = new MemoryService();
    memoryController = new MemoryController(memoryService);
  });

  describe('get memory information', () => {
    it('should return HttpStatus OK on success', async () => {
      const cpuData = await memoryController.getMemoryData();

      expect(cpuData.status).toEqual(HttpStatus.OK);
      expect(cpuData.data).toBeDefined();
      expect(cpuData.message).toBeUndefined();
    });

    it('should return HttpStatus INTERNAL_ERROR on error', async () => {
      const errorMessage = 'Something wrong happened';
      spyOn(memoryService, 'getMemoryData').mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const cpuData = await memoryController.getMemoryData();

      expect(cpuData.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(cpuData.data).toBeNull();
      expect(cpuData.message).toEqual(errorMessage);
    });
  });
});
