import { ApiResponse } from 'src/api/ApiResponse';

export interface LoginResErrors {
  email?: string[];
  password?: string[];
}
export type LoginRes = ApiResponse<LoginResErrors>;
