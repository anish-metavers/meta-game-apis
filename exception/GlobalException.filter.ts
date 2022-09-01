import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        console.log(exception);

        const responseBody = {
            error: exception.toString(),
            message: 'Something went wrong on our End',
            status: httpStatus,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
