declare type Null<T> = null | T;

declare type NotUndefined<T> = T extends undefined ? never : T;
