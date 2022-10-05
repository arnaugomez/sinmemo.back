import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError<T extends object> extends Error {
  response: T;
  constructor(response: T) {
    super('Api error. Must be handled!!');
    this.response = response;
  }

  send() {
    throw new HttpException({ errors: this.response }, HttpStatus.BAD_REQUEST);
  }

  static merge<U extends object>(e: ApiError<any>[]): ApiError<U> {
    return new ApiError(
      e.reduce((prev, curr) => ({ ...prev, ...curr.response }), {}),
    );
  }
}
