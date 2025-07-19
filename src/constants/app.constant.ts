export const CLOUDINARY = 'CLOUDINARY'

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

export const DEFAULT_SORT_BY = 'createdAt';
export const DEFAULT_SORT_ORDER = SortOrder.DESC;

export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 100000000; //100.000.000đ (100 milions)

export const DEFAULT_MIN_PERCENTAGE = 0;
export const DEFAULT_MAX_PERCENTAGE = 100;

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY'

export enum OrderStatus {
    PENDING = 'pending',
    DONE = 'done',
    PREPARING = 'preparing'
}