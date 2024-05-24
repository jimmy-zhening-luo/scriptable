declare type IsTuple<
  A,
> = TupleLength<
  A
> extends never
  ? false
  : true;
