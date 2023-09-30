import { Request, Response } from "express";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface.ts";
import { StatusCodes } from "http-status-codes";
import { Memory } from "../../../shared/models/memory.interface.ts";
import memoryService from "../services/memory.service.ts";
import { logger, LogLevels } from "../util/logger.util.ts";

async function getMemory(req: Request, res: Response) {
  try {
    logger.log(LogLevels.INFO, "get memory");
    const memory = await memoryService.getMemory();
    const okResponse: ConnectorResponse<Memory> = {
      status: StatusCodes.OK,
      response: memory,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
    logger.log(LogLevels.ERROR, "failed getting memory: %s", err);
    const errorResponse: ConnectorResponse<Memory> = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      response: null,
      errorMessage: error.message,
    };
    res.send(errorResponse);
  }
}

async function getFreeMemory(req: Request, res: Response) {
  try {
    logger.log(LogLevels.INFO, "get free memory");
    const freeMemory = await memoryService.getFreeMemory();
    const okResponse: ConnectorResponse<number> = {
      status: StatusCodes.OK,
      response: freeMemory,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
    logger.log(LogLevels.ERROR, "failed getting free memory: %s", err);
    const errorResponse: ConnectorResponse<number> = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      response: null,
      errorMessage: error.message,
    };
    res.send(errorResponse);
  }
}

export default {
  getMemory,
  getFreeMemory,
};
