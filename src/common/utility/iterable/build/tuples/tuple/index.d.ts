declare type Tuple<N extends number = 2, I = string> = [I] extends [never]
  ? never
  : N extends number
    ? N extends 0 /* TODO: constrain posint */
      ? readonly []
      : TupleBuilder<N, I>
    : never;

type TupleBuilder<N extends number, I, H extends readonly I[] = readonly []> = H["length"] extends N
  ? H
  : TupleBuilder<N, I, readonly [...H, I]>;

declare namespace Tuple {
  export type T = Tuple;
  export type T0 = Tuple<0>;
  export type T0a = Tuple<1>;
  export type T0b = Tuple<3>;
  export type T1 = Tuple<2, string | number>;
  export type T2 = Tuple<2 | 3>;
  export type T3 = Tuple<2 | 3, string | number>;
  export type T4 = Tuple<never>;
  export type T4a = Tuple<0>;
  export type T4b = Tuple<0 | 1>;
  export type T4c = Tuple<1, never>;
  export type T4d = Tuple<never, never>;
}
