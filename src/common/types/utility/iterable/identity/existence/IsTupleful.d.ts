declare type IsTupleful<
  A,
> = TuplefulLength<
  A
> extends never
  ? false
  : true;
