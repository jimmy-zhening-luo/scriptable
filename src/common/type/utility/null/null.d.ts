declare type Null<T> = null | T;

declare type Nullable<T> = Null<NonNullable<T>>;
