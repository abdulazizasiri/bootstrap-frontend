import { Injectable, Injector, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/services/language.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService, private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          let errorMessage = this.handleError(error);
          return throwError(() => new Error(errorMessage));
        })
      )
  }

  private handleError(error: HttpErrorResponse): string | any {
    if (error.status === 404) {
      return this.handleNotFound(error);
    }
    else if (error.status === 400) {
      return this.handleBadRequest(error);
    }
    else if (error.status === 401) {
      return this.handleUnauthorized(error);
    }
    else if (error.status === 403) {
      return this.handleForbidden(error);
    }
  }

  private handleNotFound = (error: HttpErrorResponse): string => {
    // this.router.navigate(['/404']);
    console.log("Not Found",error);

    return error.message;
  }

  private handleUnauthorized = (error: HttpErrorResponse) => {
    console.log("not-authorized",error);

    // this.router.navigate(['/not-authorized']);
    return error.message;
  }

 private handleBadRequest = (error: HttpErrorResponse): string => {
  let languageService = this.injector.get(LanguageService);
  const isAr = languageService.getLangPromise() === "ar";

  // Safe access check
  const message = error.error?.errors?.[0]
    ? (isAr ? error.error.errors[0].messageAr : error.error.errors[0].messageEn)
    : (isAr ? "طلب غير صالح" : "Bad Request");

  this.toastr.error(message, isAr ? "خطأ" : "Error");
  return error.error;
}


  private handleForbidden = (error: HttpErrorResponse) => {
    console.log("Forbidden",error);

    // this.router.navigate(["/forbidden"], { queryParams: { returnUrl: this.router.url } });
    return "Forbidden";
  }
}
