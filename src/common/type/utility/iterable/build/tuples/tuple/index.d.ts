// TODO: constrain to positive integer
declare type Tuple<I, N extends number = 2> = [I] extends [never]
  ? never
  : N extends number
    ? N extends 0
      ? readonly []
      : TupleBuilder<I, Numbered<N>>
    : never;

type TupleBuilder<I, N, H extends readonly I[] = readonly []> = H["length"] extends N
  ? H
  : TupleBuilder<I, N, readonly [...H, I]>;

declare namespace Tuple {
  export type T = Tuple<string>;
  export type T0 = Tuple<string, 0>;
  export type T0a = Tuple<string, 1>;
  export type T0b = Tuple<string, 3>;
  export type T1 = Tuple<string | number>;
  export type T2 = Tuple<string, 2 | 3>;
  export type T3 = Tuple<string | number, 2 | 3>;
  export type T4 = Tuple<string, never>;
  export type T4a = Tuple<string, 0>;
  export type T4b = Tuple<string, 0 | 1>;
}

type NN = Numbered<5 | 10>;
