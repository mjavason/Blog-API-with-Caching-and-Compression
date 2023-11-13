import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            [`${error.property}`]: {
              error: `${error.property} has wrong value ${error.value}.`,
              message: Object.values(error.constraints).join(''),
            },
          };
        });

        const errorResponse = {
          statusCode: 400,
          error: 'Bad Request',
          message: messages,
        };
        return new BadRequestException(errorResponse);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription(
      'A simple blog API built with Nest.js, offering user authentication, post management, categories and tags, comments, and improved performance with caching and compression.',
    )
    .setVersion('2.0')
    .addTag('Blog')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(compression());

  await app.listen(5000);
  console.log(`App listening on port ${5000}`);
}
bootstrap();
