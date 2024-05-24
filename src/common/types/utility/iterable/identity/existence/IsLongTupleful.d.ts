declare type IsLongTupleful<
  A,
> = TuplefulLength<
  A
> extends never
  ? false
  : 1 extends TuplefulLength<
    A
  >
    ? false
    : true;
