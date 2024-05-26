declare type IsTupleful<
  A,
> = IsTuple<
  A
> extends false
  ? false
  : 0 extends TupleLength<
    A
  >
    ? false
    : true;
