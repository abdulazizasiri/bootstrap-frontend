export interface IExternalLoggedInUser {
    userId: string,
    accessToken: string,
    userType: number,
    email?: string;
    otpTimeOut?: number,
    otpToken?: string,
    exp?: number, //token expiration
}

export interface ILoggedInExpertUser extends IExternalLoggedInUser {
    email: string,
    phoneNumber: string,
    isActive: boolean,
    isExpertBasicInfoComplete: boolean,
    isExpertAcademicInfoComplete: boolean,
    isExpertSkillsComplete: boolean,
    isExpertCertificatesComplete: boolean,
    isExpertAttachmentsComplete: boolean,
    isExpert: boolean,
    name: string,
    isNDAAccepted: boolean,
    isDataAccuracyConfirmed: boolean,
    isPersonalDataUsageAccepted: boolean,
    isApproved: boolean,
    isSummaryComplete: boolean
    phoneCodeId: number
}

export interface ILoginDto {
    email: string,
    password: string,
    phone: string,
    byEmail: boolean,
}

export interface ILoginResponseDto {
    email: string,
    password: string,
    phone: string,
    byEmail: boolean,
    otpTimeOut?: number,
    otpToken?: string,
}

export interface IOTPDto {
    token: string
    otp: string
}

export interface IRegisterDto {
    email: string,
    password: string,
    token: string
}

export interface IRegisterResponseDto {
    email: string,
    otpTimeOut?: number,
    otpToken?: string
}

export interface IResendOTPDto {
    email: string,
    phone: string,
    recaptchaToken: string,
    byEmail: boolean,
    token: string
}

export interface IResendOTPResponseDto {
    otpTimeOut?: number,
    otpToken: string
}

export interface IForgetPasswordDto {
    email: string,
    recaptchaToken: string
}

export interface IForgetPasswordResponseDto {
    email: string,
    otpTimeOut?: number,
    otpToken: string
}

export interface IResetPasswordDto {
    token: string,
    newPassword: string,
    email: string
}
