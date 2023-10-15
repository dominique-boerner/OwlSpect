import { StatusCodes } from "http-status-codes";

/**
 * Represents the structure of an API response.
 * @template T - The type of data included in the response.
 *
 * @example
 *
 * // Usage with ApiResponse for user data
 * const userResponse: ApiResponse<User> = {
 *  status: StatusCodes.OK,
 *  data: {
 *     id: 1,
 *     name: 'John Doe',
 *   },
 *   message: 'User retrieved successfully',
 * };
 */
export interface ApiResponse<T> {
  /**
   * The HTTP status code of the API response.
   */
  status: StatusCodes;

  /**
   * The actual data payload of the API response.
   * If StatusCode is an error code, this should be nullable type, (e. g. "[]" for array or "null")
   */
  data: T;

  /**
   * An optional message accompanying the API response.
   * This is used for providing additional information or context.
   */
  message?: string;
}
