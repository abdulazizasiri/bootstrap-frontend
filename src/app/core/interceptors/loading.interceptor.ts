import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/models/constants';
import { SpinnerService } from 'src/app/services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private modal: NgbModal
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.spinnerService.setLoading(true);
    request = request.clone({
      setHeaders: {
        lang: localStorage.getItem(Constants.lang_ls_var) || 'ar'
      }
    });
    return next.handle(request).pipe(
      catchError(x => this.handleAuthError(x)),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.spinnerService.setLoading(false);
        }
      })
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.modal.dismissAll();
      this.router.navigateByUrl(Constants.routing.shared.login);
      return of(err.message);
    }
    return throwError(err);
  }
}
