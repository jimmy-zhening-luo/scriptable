declare type IsTuple<
  Tuple,
> = TupleLength<
  Tuple
> extends never
  ? false
  : true;
