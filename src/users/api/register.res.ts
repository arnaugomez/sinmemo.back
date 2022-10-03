import { ApiResponse } from 'src/api/ApiResponse';

export interface RegisterResErrors {
  email?: string[];
}

export type RegisterRes = ApiResponse<RegisterResErrors>;
