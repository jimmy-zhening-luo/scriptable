declare type Exclusive<
  Set,
  Predicate,
> = Set extends never
  ? false
  : Exclude<
    Set
    ,
    Predicate
  > extends never
    ? true
    : false;
