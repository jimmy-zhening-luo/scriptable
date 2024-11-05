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
