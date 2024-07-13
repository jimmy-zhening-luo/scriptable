// TODO: constrain to positive integer
declare type Tuple<
  I,
  L = 2,
> = [I] extends [never]
  ? never
  : Numbered<L> extends never
    ? never
    : TupleBuilder<I, L, []>;

type TupleBuilder<I, L, H> = H["length"] extends L
  ? H
  : TupleBuilder<I, L, [...H, I]>;
