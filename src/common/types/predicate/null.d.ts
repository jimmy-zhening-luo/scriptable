declare type Null<T> =
  | null
  | T
;

declare type Nullable<T> =
  | null
  | NonNullable<T>
;
