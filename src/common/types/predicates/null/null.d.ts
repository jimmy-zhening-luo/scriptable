declare type Null<T> =
  | null
  | T
;

declare type Nullable<T> =
  | null
  | NonNullable<T>
;

declare type NonUndefined<T> = T extends undefined
  ? never
  : T
;
