import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  constructor(public http: HttpClient) { }

  get<T>(options: HttpOptions): Observable<T> {
    return this.httpCall(Verbs.GET, options)
  }

  delete<T>(options: HttpOptions): Observable<T> {
    return this.httpCall(Verbs.DELETE, options)
  }

  post<T>(options: HttpOptions): Observable<T> {
    return this.httpCall(Verbs.POST, options)
  }

  put<T>(options: HttpOptions): Observable<T> {
    return this.httpCall(Verbs.PUT, options)
  }

  patch<T>(options: HttpOptions): Observable<T> {
    return this.httpCall(Verbs.PATCH, options)
  }

  private httpCall<T>(verb: Verbs, options: HttpOptions): Observable<T> {
    // Setup default values
    options.body = options.body || null;

    const url = environment.apiUrl + options.url;

    return this.http.request<T>(verb, url, {
      body: options.body,
      headers: options.header,
      responseType: options.responseType,
      reportProgress: options.reportProgress,

    }).pipe(map((response: T) => response));
  }
}

export enum Verbs {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export class HttpOptions {
  url?: string;
  header?: any;
  body?: any;
  silent?: boolean;
  responseType?: any;
  reportProgress?: boolean;
  observe?: any;
}
