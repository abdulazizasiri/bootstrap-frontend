export interface IHttpResponse<T> {
  data?: T;
  errorMessage?: string;
  StatusCode?: number;
  message: string;
  success: boolean;
}
