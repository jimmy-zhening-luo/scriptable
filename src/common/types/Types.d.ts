declare type primitive =
  | string
  | number
  | boolean;

declare type Definite = NonNullable<unknown>;

declare type Nullable<T> = null | T;

declare type Empty = Record<string, never>;

declare type Arrayful<T> = [T, ...T[]]
