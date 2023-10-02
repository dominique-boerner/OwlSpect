import { Request, Response } from "express";
import cpuService from "./../services/cpu.service";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface";
import { Cpu } from "../../../shared/models/cpu.interface";
import { StatusCodes } from "http-status-codes";
import { logger, LogLevels } from "../util/logger.util";

async function getCpuCores(req: Request, res: Response) {
  try {
    logger.log(LogLevels.INFO, "get cpu cores");
    const cpus = await cpuService.getCpus();
    logger.log(LogLevels.INFO, `${cpus.length} cpu cores found`);
    const okResponse: ConnectorResponse<Cpu[]> = {
      status: StatusCodes.OK,
      response: cpus,
    };
    res.send(okResponse);
  } catch (err) {
    logger.log(LogLevels.ERROR, "failed getting cpu cores: %s", err);
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
