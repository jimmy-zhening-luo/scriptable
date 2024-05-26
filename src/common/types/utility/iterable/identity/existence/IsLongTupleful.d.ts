declare type IsLongTupleful<
  A,
> = IsTupleful<
  A
> extends false
  ? false
  : 1 extends TupleLength<
    A
  >
    ? false
    : true;
