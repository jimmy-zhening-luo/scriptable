// TODO: constrain to positive integer
declare type Tuple<I, L extends number = 2> = [I] extends [never]
  ? never
  : Numbered<L> extends never
    ? never
    : TupleBuilder<I, Numbered<L>, readonly []>;

type TupleBuilder<I, L, H> = H extends readonly I[]
  ? H["length"] extends L
    ? H
    : TupleBuilder<I, L, readonly [...H, I]>
  : never;
