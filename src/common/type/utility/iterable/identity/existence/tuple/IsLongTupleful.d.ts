declare type IsLongTupleful<
  Tuple,
> = IsTupleful<
  Tuple
> extends false
  ? false
  : 1 extends TupleLength<
    Tuple
  >
    ? false
    : true;
