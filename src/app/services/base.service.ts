import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { SystemSettingsService } from "./system-settings.service";
import { IHttpResponse } from "../models/http-response.model";
import { IPaginationResponse } from "../models/paginations.model";
import { environment } from "@environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private http: HttpClient;
  private readonly baseUrl: any;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    // const systemSettingsService = injector.get(SystemSettingsService);
    // const systemConfig = systemSettingsService.getConfig();
    this.baseUrl =environment.apiUrl;
  }

  // Overload signatures
// 1. Update Overload Signatures to accept the optional second argument
protected get<T>(url: string, data?: any): Observable<IPaginationResponse<T>>;
protected get<T>(url: string, data?: any): Observable<IHttpResponse<T> | null>;

// 2. The Implementation (keep as is, or refine for clarity)
protected get<T>(url: string, data?: any): Observable<any> {
  const path = data ? `${url}/${data}` : url;
  return this.http.get<any>(`${this.baseUrl}/${path}`);
}



  // Overload Signatures
  protected post<T>(url: string, data?: any): Observable<IPaginationResponse<T>>;
  protected post<T>(url: string, data?: any): Observable<IHttpResponse<T> | null>;
  // Single Implementation
  protected post<T>(url: string, data?: any): Observable<IPaginationResponse<T> | IHttpResponse<T> | null> {
    return this.http.post<IPaginationResponse<T> | IHttpResponse<T> | null>(`${this.baseUrl}/${url}`, data);
  }

protected put<T>(url: string, idOrData?: string | number | any, data?: any): Observable<IHttpResponse<T> | null> {
    // Logic to determine if the second param is an ID or the Body
    if (typeof idOrData === 'string' || typeof idOrData === 'number') {
      return this.http.put<IHttpResponse<T>>(`${this.baseUrl}/${url}/${idOrData}`, data);
    }
    return this.http.put<IHttpResponse<T>>(`${this.baseUrl}/${url}`, idOrData);
  }

protected delete<T>(url: string, data?: any): Observable<IHttpResponse<T>> {
  const path = data ? `${url}/${data}` : url;
  return this.http.delete<IHttpResponse<T>>(`${this.baseUrl}/${path}`);
}
  protected toQueryString(obj: object): string {
    return Object.keys(obj)
      .filter((key) => obj[key as keyof typeof obj] != undefined)
      .map(key => key + "=" + obj[key as keyof typeof obj])
      .join("&");
  }
}
