import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../../shared/models/api-response.interface';
import { StatusCodes } from 'http-status-codes';
import * as process from 'process';

require('dotenv').config();

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

    const errorResponse: ApiResponse<void> = {
      status: StatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
      data: null,
      message:
        'The authorization header is not set or the password is not correct.',
    };

    res.send(errorResponse);
  }
}
