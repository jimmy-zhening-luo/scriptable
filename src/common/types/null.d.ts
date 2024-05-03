declare type Nullable<T> = null | T;
declare type Definite = NonNullable<unknown>;
declare type NullRecord = Record<string, never>;
