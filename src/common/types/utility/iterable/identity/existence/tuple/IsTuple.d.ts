declare type IsTuple<
  Tuple,
> = TupleLength<
  Tuple
> extends never
  ? false
  : true;

declare type bog = IsTuple<Tuple<string, 0 | 3>>;
