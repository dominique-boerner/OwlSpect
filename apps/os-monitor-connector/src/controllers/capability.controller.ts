import { Request, Response } from "express";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface.ts";
import { StatusCodes } from "http-status-codes";
import capabilityService from "../services/capability.service.ts";
import { Capabilities } from "../../../shared/models/capability.interface.ts";

async function getCapabilities(req: Request, res: Response) {
  try {
    const capabilities = await capabilityService.getCapabilities();
    const okResponse: ConnectorResponse<Capabilities> = {
      status: StatusCodes.OK,
      response: capabilities,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
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
