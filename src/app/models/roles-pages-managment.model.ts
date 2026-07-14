
export interface IPagesListSearchForm {
    nameAr: string,
    nameEn: string,
}

export interface IPageDto {
    id: number,
    nameAr: string,
    nameEn: string,
    isActive: boolean,
    order: number,
    parentPageId: number,
    pageCategoryId: number,
    path: string,
    icon: string,
    rolesList: string[]
}

export interface IPageAddDto {
    nameAr: string,
    nameEn: string,
    isActive: boolean,
    order: number,
    parentPageId: number,
    pageCategoryId: number,
    path: string,
    icon: string,
    rolesList: string[],
}

export interface IPageUpdateDto extends IPageDto { }



export interface IUserPagesListDto {
    id: number,
    icon: string,
    name: string,
    nameAr: string,
    nameEn: string,
    parentPageId: number,
    order: number,
    path: string,
    children?: IUserPagesListDto[];
    isExpanded?: boolean;
}
