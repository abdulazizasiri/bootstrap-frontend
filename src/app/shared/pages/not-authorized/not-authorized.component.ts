import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-not-authorized',
  standalone:false,
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.css'
})
export class NotAuthorizedComponent {
 currentLang: string = 'ar'; // Default to Arabic

constructor(private languageService: LanguageService,private msalService: MsalService, private router: Router) {
       this.currentLang = this.languageService.getLangInitially();
}

  retryLogin() {

  localStorage.removeItem('token');

    this.msalService.loginRedirect().subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.error('Login failed', err)
    });
  }
}
