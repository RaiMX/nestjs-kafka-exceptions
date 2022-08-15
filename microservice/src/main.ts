import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CustomRpcExceptionFilter } from './rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        //https://kafka.js.org/docs/configuration
        clientId: 'myapp',
        brokers: ['localhost:9091'],
        retry: {
          initialRetryTime: 100,
          retries: 1000,
        },
      },
      consumer: {
        groupId: 'mygroup',
      },
    },
  });

  app.useGlobalFilters(new CustomRpcExceptionFilter());

  /** Validation pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      enableDebugMessages: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableShutdownHooks();
  app.listen();
}
bootstrap();
