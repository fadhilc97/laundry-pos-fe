export interface IBaseResponse {
  message: string;
}
export interface ISuccessResponse<D = unknown, M = unknown>
  extends IBaseResponse {
  data?: D;
  metadata?: M;
}
export interface IErrorResponse extends IBaseResponse {}
