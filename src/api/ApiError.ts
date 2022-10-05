import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class ApiError<T extends object> extends Error {
  response: T;
  constructor(response: T) {
    super('Api error. Must be handled!!');
    this.response = response;
  }

  private get body() {
    return { errors: this.response };
  }

  send() {
    throw new BadRequestException(this.body);
  }

  sendUnauthorized() {
    throw new UnauthorizedException(this.body);
  }

  static merge<U extends object>(e: ApiError<any>[]): ApiError<U> {
    return new ApiError(
      e.reduce((prev, curr) => ({ ...prev, ...curr.response }), {}),
    );
  }
}
