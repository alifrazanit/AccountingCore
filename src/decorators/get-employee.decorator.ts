import { m_users } from "@entities/m_users.entity";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): m_users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})