import { Logger, RpcExceptionFilter } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
export declare class ExceptionFilter implements RpcExceptionFilter {
    logger: Logger;
    catch(exception: RpcException): Observable<any>;
}
