import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('SVC_PROVIDER') private readonly service: ClientKafka) {}

  async onModuleInit() {
    this.service.subscribeToResponseOf('mytopic');
    await this.service.connect();
  }

  async onModuleDestroy() {
    await this.service.close();
  }

  public async sendToSvc(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service
        .send('mytopic', {
          value: null,
        })
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }
}
