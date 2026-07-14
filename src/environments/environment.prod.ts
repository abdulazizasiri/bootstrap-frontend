export const environment = {
  production: true,
  apiUrl: 'http://localhost:5234/api',

  // Azure AD Configuration
  AzureAd: {
    TenantId: 'ee15d2b9-1c6f-4fec-8e7c-23e61be994f9',
    ClientId: 'c2c61176-1360-4d07-9fc7-69656c76c227',
    Authority:
      'https://login.microsoftonline.com/ee15d2b9-1c6f-4fec-8e7c-23e61be994f9',
    RedirectUri: 'https://localhost:4200/dashboard',
    PostLogoutRedirectUri: 'https://localhost:4200/dashboard',
  },

  // Protected resources for MSAL
  protectedResources: [
    {
      url: 'https://graph.microsoft.com/v1.0/me',
      scopes: ['User.Read'],
    },
    {
      url: 'https://graph.microsoft.com/v1.0/users',
      scopes: ['User.Read'],
    },
  ],
};
