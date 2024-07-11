declare type FlatAll<A, T> = Exclusive<Flat<A>, T> extends false
  ? never
  : Flat<A>;
