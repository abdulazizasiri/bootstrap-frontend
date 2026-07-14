/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import {
  LogLevel,
  Configuration,
  BrowserCacheLocation,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser'; 
import { SystemSettingsService } from '../../services/system-settings.service';
/**
* Configuration object to be passed to MSAL instance on creation.
* For a full list of MSAL.js configuration parameters, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
*/

export function MSALInstanceFactory(systemSettingsService: SystemSettingsService): IPublicClientApplication {
  const config = systemSettingsService.getConfig();
  const dynamicConfig: Configuration = {
    auth: {
      clientId: config?.azureAd?.clientId,
      authority: config?.azureAd?.authority,
      redirectUri: config?.azureAd?.redirectUri,
      postLogoutRedirectUri: config?.azureAd?.postLogoutRedirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: true,
      claimsBasedCachingEnabled: true,
    },
    system: {
      allowNativeBroker: false,
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) return;
        },
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  };

  return new PublicClientApplication(dynamicConfig);
}

export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'offline_access'],
};
