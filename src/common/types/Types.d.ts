declare type primitive =
  | string
  | number
  | boolean;

declare type Nullable<T> = null | T;

declare type Defined = null | NonNullable<unknown>