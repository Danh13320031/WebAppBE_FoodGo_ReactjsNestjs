import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LOCALE, TIMEZONE } from '../constants';
import { IApiResponse } from '../interfaces';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const startTime: number = Number(request['startTime']);
    const endTime: number = Date.now();
    const takenTime: string = `${endTime - startTime} ms`;

    let status: number;
    let message: string;
    let error: any;

    if (exception instanceof HttpException) {
      // Lỗi Http: Lỗi có chủ đích (Đã biết trước)
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const exceptionResponseObj = exceptionResponse as Record<string, any>;

        message =
          exceptionResponseObj.message ||
          exceptionResponseObj.error ||
          'Lỗi không xác định';

        // Lỗi validation từ class-validator (DTO)
        if (Array.isArray(exceptionResponseObj.message)) {
          message = 'Dữ liệu không hợp lệ';
          error = exceptionResponseObj.message;
        }
      } else {
        message = 'Lỗi không xác định';
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Hệ thống đang gặp sự cố, vui lòng thử lại sau';
      this.logger.error(exception);
    }

    const errResponse: IApiResponse<any> = {
      success: false,
      message,
      ...(error && { error }),
      date: new Date().toLocaleString(LOCALE, {
        timeZone: TIMEZONE,
        hour12: false,
      }),
      path: ctx.getRequest<Request>().url,
      takenTime,
    };

    response.status(status).json(errResponse);
  }
}
