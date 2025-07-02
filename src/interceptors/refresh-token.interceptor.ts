import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ms from "ms";
import { map, Observable } from "rxjs";


@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor{

    constructor(private configService: ConfigService) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const res = context.switchToHttp().getResponse();

        return next.handle().pipe(map(data => {
            res.cookie('refreshToken', data.refreshToken, { 
                httpOnly: true,
                maxAge: ms(this.configService.get('JWT_REFRESH_EXPIRES'))
            });
            return data;
        }));
    }

}