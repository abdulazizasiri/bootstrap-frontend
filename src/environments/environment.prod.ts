export const environment = {
  production: true,
  apiUrl: 'http://localhost:5234/api',

  // Azure AD Configuration
  AzureAd: {
    TenantId: 'c4d7531f-2c70-49ef-97de-08301f072d0f',
    ClientId: 'bc6a8598-b5e8-4cff-ac71-bfd34cd2a04b',
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
