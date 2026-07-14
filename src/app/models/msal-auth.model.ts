export interface IInternalLoggedInUser {
    userId: string
    email: string,
    nameAr: string,
    nameEn: string,
    groupId: number,
    userType: number,
    accessToken: string,
    isActive: boolean,
    userPermissions: IUserPermissions[]
}

export interface IUserPermissions {
    code: string,
    permissionEnum: number
}