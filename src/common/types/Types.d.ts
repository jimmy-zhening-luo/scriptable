/* Primitive */
declare type primitive =
  | string
  | number
  | boolean;

declare type literal<S extends string> = string extends S
  ? never
  : S;

/* Null */
declare type Nullable<T> = null | T;

declare type Definite = NonNullable<unknown>;

declare type NullRecord = Record<string, never>;

/* Validated */

/* Record */
declare type Exact<
  Actual,
  Prototype,
> = Actual extends Prototype
  ? Exclude<keyof Actual, keyof Prototype> extends never
    ? Actual
    : never
  : never;

/* Array */
declare type Arrayful<T> = [T, ...T[]];
