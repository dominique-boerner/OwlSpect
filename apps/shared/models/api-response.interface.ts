import { StatusCodes } from "http-status-codes";

export interface ApiResponse<T> {
  status: StatusCodes;
  data: T;
  message?: string;
}
