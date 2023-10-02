import { Request, Response } from "express";
import { ConnectorResponse } from "../../../shared/models/connector-response.interface";
import { StatusCodes } from "http-status-codes";
import { Network } from "../../../shared/models/machine-information.interface";
import networkService from "../services/network.service";
import { NetworkInterfaceInfo } from "os";
import { logger, LogLevels } from "../util/logger.util";

async function getNetwork(req: Request, res: Response) {
  try {
    logger.log(LogLevels.INFO, "get network");
    const network: Network = await networkService.getNetwork();
    const okResponse: ConnectorResponse<Network> = {
      status: StatusCodes.OK,
      response: network,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
    logger.log(LogLevels.ERROR, "failed getting network: %s", err);
    const errorResponse: ConnectorResponse<Network> = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      response: null,
      errorMessage: error.message,
    };
    res.send(errorResponse);
  }
}

async function getSpecificNetwork(req: Request, res: Response) {
  try {
    const params = req.params;
    const networkParam = params.network;
    logger.log(LogLevels.INFO, "get specific network %s", networkParam);

    const network: NetworkInterfaceInfo[] =
      await networkService.getSpecificNetwork(networkParam);

    const okResponse: ConnectorResponse<NetworkInterfaceInfo[]> = {
      status: StatusCodes.OK,
      response: network,
    };
    res.send(okResponse);
  } catch (err) {
    const error = err as Error;
    logger.log(LogLevels.ERROR, "failed getting network: %s", err);
    const errorResponse: ConnectorResponse<NetworkInterfaceInfo[]> = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      response: null,
      errorMessage: error.message,
    };
    res.send(errorResponse);
  }
}

export default {
  getNetwork,
  getSpecificNetwork,
};
