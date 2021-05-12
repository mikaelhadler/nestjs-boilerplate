import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { LoggerService } from './modules/logger/logger.service'

const logger = new LoggerService()

async function bootstrap() {
  logger.contextName = NestFactory.create.name

  process.setMaxListeners(100)

  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter(new LoggerService()))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const options = new DocumentBuilder()
    .setTitle('Meu titulo')
    .setDescription('Minha descrição')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  const swaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none" }
  };
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions)

  await app.listen(process.env.PORT || 3000)

  if (process.env.NODE_ENV === 'development') {
    logger.info(`API listening in: http://localhost:${process.env.PORT || 3000}`)
    logger.info(`Swagger listening in: http://localhost:${process.env.PORT || 3000}/docs`)
  }
}
bootstrap()
