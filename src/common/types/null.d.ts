declare type Nullable<T> = null | T;
declare type NotUndefined<T> = T extends undefined ? never : T;
