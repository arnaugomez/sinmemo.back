import { HttpException, HttpStatus } from '@nestjs/common';

export interface ApiResponse<T extends object> {
  errors?: T;
}

export function getApiResponse<T extends object>(errors: T): ApiResponse<T> {
  if (!Object.keys(errors).length) return {};
  throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
}
