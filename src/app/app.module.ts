import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsalModule, MsalGuardConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'angular-calendar';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChangeRequestFromComponent } from './components/change-requests/change-request-form/change-request-from.component';
import { ChangeRequestsListComponent } from './components/change-requests/change-requests-list/change-requests-list.component';
import { ChangeRequestsManagementComponent } from './components/change-request-management/change-requests-management.component';
import { NotAuthorizedComponent } from '@shared/pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from '@shared/pages/not-found/not-found.component';
import { ForbiddenComponent } from '@shared/pages/forbidden/forbidden.component';

import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorHandlerService } from './interceptors/error-handler.service'; // consider renaming to ErrorInterceptor

// NOTE: adjust the import paths above to match your actual folder structure.

const isIE =
  window.navigator.userAgent.indexOf('MSIE') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['User.Read'],
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    DashboardComponent,
    ChangeRequestFromComponent,
    ChangeRequestsListComponent,
    ChangeRequestsManagementComponent,
    NotAuthorizedComponent,
    NotFoundComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Routing (was imported twice before — once is enough)
    AppRoutingModule,

    // UI libraries
    NgbModule,
    NgSelectModule,
    CalendarModule,

    // MSAL — Azure AD login
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.AzureAd.ClientId,
          redirectUri: environment.AzureAd.RedirectUri,
          authority: `${environment.AzureAd.Authority}/${environment.AzureAd.TenantId}`,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['User.Read'], // keep initial login minimal; API scopes are requested on demand
        },
      },
      {
        interactionType: InteractionType.Redirect,
        // Empty on purpose: the frontend never calls Graph directly —
        // the backend does, using the Graph token we hand it during the exchange.
        protectedResourceMap: new Map<string, Array<string>>(),
      },
    ),

    // Toast notifications
    ToastrModule.forRoot({
      closeButton: false,
      progressBar: true,
      preventDuplicates: true,
      positionClass: 'toast-top-right',
    }),

    // i18n
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // Order matters:
    // requests flow  Loading → Auth → ErrorHandler → server
    // responses flow server → ErrorHandler → Auth → Loading
    // ErrorHandlerService MUST re-throw errors or AuthInterceptor's 401
    // handling never runs.
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
