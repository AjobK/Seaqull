import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext): any {
    const allowAny = this.reflector.get<string[]>('allow-any', context.getHandler())
    if (user) return user
    if (allowAny) return undefined
    throw new UnauthorizedException()
  }
}
