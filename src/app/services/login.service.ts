import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject } from 'rxjs';
import { IUserProfile } from '../models/IUserProfile';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  name: string = '';
  userName: string = '';
  displayName: string = '';

  constructor(private msalService: MsalService) {
  }

  // logout() {

  //   localStorage.removeItem('token');

  //   this.msalService.logoutRedirect({
  //     //postLogoutRedirectUri: 'http://localhost:4200/logout'  // Replace with your app's redirect URI after logout
  //   });
  // }
 private userProfileSubject = new BehaviorSubject<IUserProfile | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  setUserProfile(profile: IUserProfile) {
    this.userProfileSubject.next(profile);
    this.name = profile.name;
    this.userName = profile.username;
    this.displayName = profile.displayName;
  }

  getUserProfile(): IUserProfile | null {
    return this.userProfileSubject.value;
  }

  logout() {
    this.userProfileSubject.next(null);
    this.name = '';
    this.userName = '';
    this.displayName = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
  }
}
