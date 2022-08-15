import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async testException(): Promise<any> {
    //Manually throw exception
    console.log('I am about to throw exception');

    //after this line nothing happens
    throw new HttpException(
      HttpException.createBody({ message: 'I am an exception', error: {} }),
      500,
    );
  }
}
