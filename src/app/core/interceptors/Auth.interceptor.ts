import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

/**
 * Attaches the backend JWT to outgoing requests targeting OUR API only,
 * and handles 401 responses by clearing the session and redirecting to login.
 *
 * Replaces the old AuthInterceptor + BackendTokenInterceptor pair.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Token access goes through the service (single source of truth for storage)
    const token = this.authService.getBackendToken();

    // Exact, environment-aware match — never attach our JWT to third-party URLs
    const isBackendRequest = req.url.startsWith(environment.apiUrl);

    // The token-exchange call itself must not carry our backend JWT
    const isVerifyRequest = req.url.includes('/auth/verify-token');

    if (token && isBackendRequest && !isVerifyRequest) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Backend rejected the token (expired/invalid) → end session cleanly
        if (error.status === 401 && isBackendRequest && !isVerifyRequest) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      }),
    );
  }
}
