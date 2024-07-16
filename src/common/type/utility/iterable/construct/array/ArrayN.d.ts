// TODO: constrain to positive integer
declare type ArrayN<I, L extends number> = MinLength<L> extends 0
  ? I[]
  : ArrayBuilder<I, MinLength<L>>;

type ArrayBuilder<I, L extends number, H extends I[] = []> = H["length"] extends L
  ? [...H, ...I[]]
  : ArrayBuilder<I, L, [...H, I]>;
