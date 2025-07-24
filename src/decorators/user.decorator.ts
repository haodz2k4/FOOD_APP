import { createParamDecorator, ExecutionContext } from "@nestjs/common";



export const User = createParamDecorator(
    (field: string | undefined, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        console.log(req.user);
        return field ? req.user[field] : req.user
    }
)