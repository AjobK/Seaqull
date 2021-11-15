import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const AuthorizedUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  return req.user
})

export const JwtToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  return req.cookies.token
})
