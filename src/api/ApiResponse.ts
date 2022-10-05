import { HttpException, HttpStatus } from '@nestjs/common';

export interface ApiResponse<T extends object> {
  errors?: T;
}

export function handleApiError<T extends object>(errors: T) {
  throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
}
