export interface IBaseResponse {
  message: string;
}
export interface ISuccessResponse<D = unknown> extends IBaseResponse {
  data?: D;
}
export interface IErrorResponse extends IBaseResponse {}
