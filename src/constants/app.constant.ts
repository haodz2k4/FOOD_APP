

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export const RESPONSE_MESSAGE = "response_message";

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}


export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_LIMIT = 1000;

export const DEFAULT_SORT_BY = 'createdAt'
export const DEFAULT_SORT_ORDER = SortOrder.DESC