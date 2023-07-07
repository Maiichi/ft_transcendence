import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MulterError } from 'multer';

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    const message = exception.message;
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}