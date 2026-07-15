import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Added this
import { Subject, filter, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';

// Services
import { LanguageService } from './services/language.service';
import { LoginService } from './services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from './models/constants';

// MSAL
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  InteractionStatus,
  InteractionRequiredAuthError,
  AuthenticationResult,
  AccountInfo
} from '@azure/msal-browser';
import { ApiUrls } from './services/apis';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroying$ = new Subject<void>();
  activeAccount?: AccountInfo;
  isLoading = false;
  language?: string;
  showLogo: boolean = false;
  showLogoInRoutes = [`/${Constants.routing.routing.searchResultPage}`];

  consentScopes = {
    scopes: ['User.Read'],
  };

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient, // Injected HttpClient
    private toastrService: ToastrService,
    private languageService: LanguageService,
    public loginService: LoginService,
    private router: Router,
    private renderer: Renderer2,
    private titleService: Title,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.language = this.languageService.getLangInitially()!;
    this.languageService.setDirection(this.renderer, this.language);
    this.handleTitle();

    // Small timeout to ensure the UI thread is free before MSAL processes redirects
    setTimeout(() => {
      this.handleMsalAzureLogin();
    }, 0);
  }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._destroying$)
    ).subscribe((event: any) => {
      this.showLogo = this.showLogoInRoutes.includes(event.urlAfterRedirects);
    });
  }

  handleMsalAzureLogin() {
    // 1. Handle the redirect result (when coming back from Azure)
    this.msalService.instance.handleRedirectPromise().then((result: AuthenticationResult | null) => {
      if (result) {
        this.msalService.instance.setActiveAccount(result.account);
        this.loginService.name = result.account.name;
        this.loginService.userName = result.account.username;
      }
      this.verifyAccountPresence();
    }).catch(error => {
      console.error("Error handling redirect promise:", error);
    });

 // In your handleMsalAzureLogin() or ngOnInit()
this.msalBroadcastService.inProgress$
  .pipe(
    // Wait until there is no active interaction (login/redirect)
    filter((status: InteractionStatus) => status === InteractionStatus.None),
    takeUntil(this._destroying$)
  )
  .subscribe(() => {
    // Now that interaction is done, try to get the account
    this.performTokenExchange();
  });
  }

  verifyAccountPresence() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    } else {
      // If no account is present, redirect to login
      this.msalService.loginRedirect(this.consentScopes);
    }
  }

  performTokenExchange() {
    let activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      const accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
      activeAccount = accounts[0];
    }

    if (activeAccount) {
      this.activeAccount = activeAccount;
      this.loginService.name = activeAccount.name;

      const tokenRequest = {
        ...this.consentScopes,
        account: activeAccount
      };

      // Get Azure Tokens Silently
      this.msalService.acquireTokenSilent(tokenRequest).subscribe({
        next: (result) => {
          const identityToken = result.idToken;
          const graphAccessToken = result.accessToken;
          this.http.post<any>(`${environment.apiUrl}/auth/verify-token`, {
            token: identityToken,
            graphToken: graphAccessToken // Pass this along for your Graph snippet
          })
            .subscribe({
              next: (beResponse) => {
                localStorage.setItem('be_token', beResponse.accessToken);
                this.isLoading = false;
                console.log("Backend Token Exchange Successful");
                this.router.navigate(['/dashboard']);
              },
              error: (err) => {
                console.error("Backend token exchange failed", err);
                this.router.navigate(['/login']);
              }
            });
        },
        error: (error) => {
          if (error instanceof InteractionRequiredAuthError) {
            this.msalService.loginRedirect(tokenRequest);
          }
        }
      });
    }
  }

  handleTitle() {
    this.translateService.get('Automation-Tool').subscribe((translatedTitle: string) => {
      this.titleService.setTitle(translatedTitle);
    });

    this.translateService.onLangChange.pipe(takeUntil(this._destroying$)).subscribe(() => {
      this.translateService.get('Automation-Tool').subscribe(title => this.titleService.setTitle(title));
    });
  }

  changeLanguage() {
    let newLang = this.language == 'ar' ? 'en' : 'ar';
    this.languageService.setLang(newLang, this.renderer);
    this.language = newLang;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  logout() {
    localStorage.removeItem('be_token');
    this.msalService.logoutRedirect();
  }
}
