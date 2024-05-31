declare type FlatAll<
  Iterable,
  Predicate,
> = Exclusive<Flat<Iterable>, Predicate> extends false
  ? never
  : Flat<Iterable>;

type FlatTest = FlatAll<[5, 5, 5], number>;
