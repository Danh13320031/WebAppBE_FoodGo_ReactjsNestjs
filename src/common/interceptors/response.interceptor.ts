import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LOCALE, TIMEZONE } from '../constants/index.constant';
import { IApiResponse } from '../interfaces';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  IApiResponse<T>
> {
  private getDefaultMessage(method: string): string {
    switch (method) {
      case 'POST':
        return 'Tạo mới thành công';
      case 'GET':
        return 'Lấy dữ liệu thành công';
      case 'PATCH':
        return 'Lấy dữ liệu thành công';
      case 'DELETE':
        return 'Xoá thành công';
      default:
        return 'Yêu cầu đã hoàn thành';
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const startTime: number = Number(request['startTime']);
    const endTime: number = Date.now();
    const takenTime: string = `${endTime - startTime} ms`;

    return next.handle().pipe(
      map((data: any) => {
        if (data && typeof data === 'object' && 'success' in data)
          return data as IApiResponse<T>;

        let finalMessage = this.getDefaultMessage(request.method);

        if (data && typeof data === 'object' && 'message' in data) {
          finalMessage = data.message as string;

          const { message, ...rest } = data;
          data = Object.keys(rest).length > 0 ? rest : undefined;
        }

        if (data && typeof data === 'object' && 'data' in data)
          data = data.data as T;

        return {
          success: true,
          message: finalMessage,
          data,
          date: new Date().toLocaleString(LOCALE, {
            timeZone: TIMEZONE,
            hour12: false,
          }),
          path: request.url,
          takenTime,
        };
      }),
    );
  }
}
