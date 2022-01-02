import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ServerHost = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  const url = `${ req.protocol }://${ req.get('host') }`

  return url
})
