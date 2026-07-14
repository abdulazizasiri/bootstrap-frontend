import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthService } from 'src/app/services/Auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}


intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // 1. Grab your custom backend token
  const token = localStorage.getItem('be_token');

  // 2. Define which URLs should get this token
  const isBackendRequest = req.url.includes('localhost:7073') || req.url.includes(environment.apiUrl);
  const isVerifyRequest = req.url.includes('/auth/verify-token');

  // 3. Attach only if it's our backend and NOT the initial exchange call
  if (token && isBackendRequest && !isVerifyRequest) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // This matches your curl -H "authorization: Bearer ..."
      }
    });
  }

  return next.handle(req);
}


}
