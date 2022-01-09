import { Controller, Get } from '@nestjs/common'
import { AllowAny } from '../decorators/allow-any.decorator'

@Controller('health')
export class HealthController {

  @Get('ping')
  @AllowAny()
  public getPong(): { message: string } {
    return { message: 'Pong!' }
  }
}
