declare type Exclusive<
  Set,
  Predicate,
> = Exclude<
  Set
  ,
  Predicate
> extends never
  ? true
  : false;
