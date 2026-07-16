import { Injectable, signal, computed } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

export interface UserSession {
  id: string;
  email: string;
  fullname: string;
  role: string;
  department?: string;
  jobTitle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  // A writable signal holding the user state (null if logged out)
  private currentUserSignal = signal<UserSession | null>(null);

  // Expose as a read-only signal so components can't accidentally overwrite it
  public currentUser = this.currentUserSignal.asReadonly();

  // Helper signals derived from the main user object
  public isLoggedIn = computed(() => this.currentUserSignal() !== null);
  public userRole = computed(() => this.currentUserSignal()?.role ?? '');

  constructor() {
    // Automatically try to load the user profile if a token exists on startup
    this.initializeUserFromStorage();
  }

  /**
   * Call this right after a successful login / token exchange
   */
  public setUserFromToken(token: string): void {
    try {
      const decoded: any = jwtDecode(token);

      const session: UserSession = {
        id: decoded.sub || decoded.nameid,
        email: decoded.email,
        fullname: decoded.unique_name ||  decoded.fullname,
        role: decoded.role, // Extracted from backend JWT
        department: decoded.department
      };

      this.currentUserSignal.set(session);
    } catch (error) {
      console.error('Failed to decode backend token:', error);
      this.clearSession();
    }
  }

  public initializeUserFromStorage(): void {
    const token = localStorage.getItem('be_token');
    if (token) {
      this.setUserFromToken(token);
    }
  }

  public clearSession(): void {
    localStorage.removeItem('be_token');
    this.currentUserSignal.set(null);
  }
}
