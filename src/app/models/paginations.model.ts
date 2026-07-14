import { IHttpResponse } from "./http-response.model";

export interface IPaginationResponse<T> extends IHttpResponse<T> {
    totalRecord: number,
    pageIndex: number,
    pageSize: number
}
