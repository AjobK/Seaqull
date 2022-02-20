import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const AllowAny = (): CustomDecorator => SetMetadata('allow-any', true)
