import { Request, Response } from "express";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface.ts";
import { StatusCodes } from "http-status-codes";
import capabilityService from "../services/capability.service.ts";
import { Capabilities } from "../../../shared/models/capability.interface.ts";
import { logger, LogLevels } from "../util/logger.util.ts";

async function getCapabilities(req: Request, res: Response) {
  try {
    logger.log(LogLevels.INFO, "get capabilities");
    const capabilities = await capabilityService.getCapabilities();
    logger.log(LogLevels.INFO, `${capabilities.length} capabilities found`);
    const okResponse: ConnectorResponse<Capabilities> = {
      status: StatusCodes.OK,
      response: capabilities,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
    logger.log(LogLevels.ERROR, "failed getting capabilities: %s", err);
    const errorResponse: ConnectorResponse<Capabilities> = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      response: null,
      errorMessage: error.message,
    };
    res.send(errorResponse);
  }
}

export default {
  getCapabilities,
};
