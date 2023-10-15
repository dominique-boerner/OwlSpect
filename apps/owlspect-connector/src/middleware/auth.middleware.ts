import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../../shared/models/api-response.interface';
import { StatusCodes } from 'http-status-codes';
import * as process from 'process';

require('dotenv').config();

/**
 * This class is called on every API request. It checks, if the header of the request
 * contains the password, which is in the .env-file.
 *
 * If the Back-End runs in development mode, then this check will always return true.
 *
 * If the password is wrong, return a Response with StatusCodes.NETWORK_AUTHENTICATION_REQUIRED.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const password = process.env.PASSWORD;
    const isDev = process.env.MODE === 'dev';

    if (isDev || token === password) {
      next();
      return;
    }

    // create and send the errorResponse if user is not authenticated.
    const errorResponse: ApiResponse<void> = {
      status: StatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
      data: null,
      message:
        'The authorization header is not set or the password is not correct.',
    };

    res.send(errorResponse);
  }
}
