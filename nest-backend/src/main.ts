import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { Logger, ValidationPipe } from '@nestjs/common'

const bootstrap = async () => {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule)

  const swaggerEndpointPath = 'docs'
  const port = 3000

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Seaqull API')
    .setDescription('The seaqull app backend api')
    .setVersion('2.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [],
    extraModels: [],
    ignoreGlobalPrefix: true,
    deepScanRoutes: true,
  })
  SwaggerModule.setup(swaggerEndpointPath, app, document)

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())

  await app.listen(port)
  logger.log(`Application listening on port ${port}`)
  logger.log(`Documentation available at /${swaggerEndpointPath}`)
}

bootstrap()
