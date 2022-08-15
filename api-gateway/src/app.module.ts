import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'SVC_PROVIDER',
      useFactory: async () => {
        return ClientProxyFactory.create({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'svc_from_api',
              brokers: ['localhost:9091'],
              retry: {
                initialRetryTime: 100,
                retries: 1000,
              },
            },
            consumer: {
              groupId: 'svc_from_api',
            },
          },
        });
      },
      inject: [],
    },
    AppService,
  ],
})
export class AppModule {}
