declare type FlatAll<
  Iterable,
  Predicate,
> = Exclusive<Flat<Iterable>, Predicate> extends false
  ? never
  : Flat<Iterable>;
