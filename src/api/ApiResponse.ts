export interface ApiResponse<T extends object> {
  errors?: T;
}

export function getApiResponse<T extends object>(errors: T): ApiResponse<T> {
  if (!Object.keys(errors).length) return {};
  return { errors };
}
