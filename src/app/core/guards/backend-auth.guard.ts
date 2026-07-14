import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "src/app/services/Auth.service";

@Injectable({ providedIn: 'root' })
export class BackendAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    // If no be_token, stay on a loading page or redirect to login
    return false;
  }
}
