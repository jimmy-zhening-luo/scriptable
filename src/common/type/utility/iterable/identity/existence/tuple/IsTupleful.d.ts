declare type IsTupleful<
  Tuple,
> = IsTuple<
  Tuple
> extends false
  ? false
  : 0 extends TupleLength<
    Tuple
  >
    ? false
    : true;
