import { Request, Response } from "express";
import cpuService from "./../services/cpu.service.ts";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface.ts";
import { Cpu } from "../../../shared/models/cpu.interface.ts";
import { StatusCodes } from "http-status-codes";

async function getCpuCores(req: Request, res: Response) {
  try {
    const cpus = await cpuService.getCpus();
    const okResponse: ConnectorResponse<Cpu[]> = {
      status: StatusCodes.OK,
      response: cpus,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
    const errorResponse: ConnectorResponse<Cpu[]> = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      response: [],
      errorMessage: error.message,
    };
    res.send(errorResponse);
  }
}

export default {
  getCpuCores,
};
