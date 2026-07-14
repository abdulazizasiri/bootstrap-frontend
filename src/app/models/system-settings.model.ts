export interface ISystemSettingsDto {
    azureAd: {
        instance: string,
        authority: string,
        redirectUri: string,
        postLogoutRedirectUri: string,
        graphEndPoint: string,
        domain: string,
        clientId: string,
        scopeId: string
    },
    serviceUrl: string,
    clientUrl: string,
    dashboardUrl: string,
    reCaptchaSettings: {
        isEnabled: boolean,
        siteKey: string
    }
}
