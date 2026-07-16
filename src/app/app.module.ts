import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
// import { AuthorizationInterceptor } from '@core/interceptors/authorization.interceptor';
import { ErrorHandlerService } from '@core/interceptors/error-handler.interceptor';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { RoomListComponent } from './components/rooms/room-list/room-list.component';
import { CalendarModule } from 'primeng/calendar';
import { ChangeRequestFromComponent } from './components/change-requests/change-request-form/change-request-from.component';
import { ChangeRequestsListComponent } from './components/change-requests/change-requests-list/change-requests-list.component';
import { ChangeRequestsManagementComponent } from './components/change-request-management/change-requests-management.component';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalModule } from '@azure/msal-angular';
import { NotAuthorizedComponent } from '@shared/pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from '@shared/pages/not-found/not-found.component';
import { ForbiddenComponent } from '@shared/pages/forbidden/forbidden.component';
import { AuthInterceptor } from '@core/interceptors/Auth.interceptor';

const isIE =
  window.navigator.userAgent.indexOf('MSIE') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

const _scopes = ['User.Read', 'api://cbaae123-def3-42cd-b1b8-ef44f8182c3c/api.read', 'api://cbaae123-def3-42cd-b1b8-ef44f8182c3c/api.write'];

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    DashboardComponent,
    // RoomListComponent,
    ChangeRequestFromComponent,
    ChangeRequestsListComponent,
ChangeRequestsManagementComponent,
NotAuthorizedComponent,
NotFoundComponent,
ForbiddenComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
  CalendarModule,
    NgSelectModule,
    AppRoutingModule,
    BrowserModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.AzureAd.ClientId,
          redirectUri: environment.AzureAd.RedirectUri,
          authority: `${environment.AzureAd.Authority}/${environment.AzureAd.TenantId}`,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE
        },
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['User.Read'] // Keep this simple for initial login
        },
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map<string, Array<string>>([
          ['https://graph.microsoft.com/v1.0/me', ['User.Read']]
        ]),
      }
    ),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      closeButton: false,
      progressBar: true,
      preventDuplicates: true,
      positionClass: "toast-top-right",

    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })
  ],
  providers: [
    //{ provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true },

  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   return { interactionType: InteractionType.Redirect, protectedResourceMap };
// }
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['User.Read']
    }
  };
}
