import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";



export const Ip = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const req: Request = ctx.switchToHttp().getRequest()
        return req.ip
    }
)