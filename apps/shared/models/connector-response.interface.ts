import { StatusCodes } from "http-status-codes";

export interface ConnectorResponse<T> {
  status: StatusCodes;
  errorMessage?: string;
  response: T | null;
}
