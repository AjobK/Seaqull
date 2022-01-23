import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { Logger, ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

const bootstrap = async () => {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  const swaggerEndpointPath = process.env.SWAGGER_DOCS_ENDPOINT
  const port = process.env.BACKEND_PORT

  if (process.env.NODE_ENV === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Seaqull API')
      .setDescription('The seaqull app backend api')
      .setVersion('2.0')
      .addCookieAuth('token')
      .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [],
      extraModels: [],
      ignoreGlobalPrefix: false,
      deepScanRoutes: true,
    })
    SwaggerModule.setup(swaggerEndpointPath, app, document)
  }

  const allowedOrigins = [
    process.env.FRONTEND_URL,
  ]

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalGuards(new JwtAuthGuard(new Reflector))

  app.use(cookieParser())

  await app.listen(port)
  logger.log(`Application listening on port ${ port }`)

  if (process.env.NODE_ENV === 'development') {
    logger.log(`Documentation available at /${ swaggerEndpointPath }`)
  }
}

bootstrap()