import { Request, Response } from "express";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface.ts";
import { StatusCodes } from "http-status-codes";
import infoService from "../services/info.service.ts";
import { MachineInformation } from "../../../shared/models/machine-information.interface.ts";
import { logger, LogLevels } from "../util/logger.util.ts";

async function getInformation(req: Request, res: Response) {
  try {
    logger.log(LogLevels.INFO, "get information about the host system");
    const information: MachineInformation = {
      hostname: await infoService.getHostname(),
      version: await infoService.getVersion(),
      uptime: await infoService.getUptime(),
      release: await infoService.getRelease(),
      plattform: await infoService.getPlattform(),
      os: await infoService.getOs(),
    };

    const okResponse: ConnectorResponse<MachineInformation> = {
      status: StatusCodes.OK,
      response: information,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
    logger.log(
      LogLevels.ERROR,
      "failed getting information about the host system: %s",
      err,
    );
    const errorResponse: ConnectorResponse<MachineInformation> = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      response: null,
      errorMessage: error.message,
    };
    res.send(errorResponse);
  }
}

export default {
  getInformation,
};
