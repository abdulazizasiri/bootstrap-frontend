import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiUrls } from './apis'; // Ensure this contains the path to verify-token
import { environment } from '@environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'be_token';

  constructor(private msalService: MsalService, private http: HttpClient) {}

  async loginAndExchangeToken() {
    try {
      // 1. Login to Azure AD using Popup
      const loginResponse = await firstValueFrom(this.msalService.loginPopup());
      this.msalService.instance.setActiveAccount(loginResponse.account);

      // 2. Get the Azure ID Token for identity verification
      const azureToken = loginResponse.idToken;

      // 3. Exchange Azure Token for Backend JWT
      // Using ApiUrls for consistency
      const response: any = await firstValueFrom(
        this.http.post(`${environment.apiUrl}${ApiUrls.Identity.ValidateInternalUserToken}`, { token: azureToken })
      );

      // 4. Store your Backend JWT
      if (response && response.accessToken) {
        localStorage.setItem(this.TOKEN_KEY, response.accessToken);
        return response.accessToken;
      }

      throw new Error("No access token received from backend");
    } catch (error) {
      console.error("Authentication flow failed", error);
      throw error;
    }
  }

  getBackendToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getBackendToken();
  }
  getUserId(): string | null {
    const token = localStorage.getItem('be_token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      // Ensure this matches the claim name in your C# JwtProvider (e.g., "userId" or "sub")
      return decoded.userId || decoded.sub || null;
    } catch (error) {
      return null;
    }
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.msalService.logoutRedirect();
  }
}


