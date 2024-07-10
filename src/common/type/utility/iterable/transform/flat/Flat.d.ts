declare type Flat<Iterable> = [Iterable] extends [(infer Inner)[]]
  ? Inner
  : [Iterable] extends [readonly (infer Inner)[]]
      ? Inner
      : never;
