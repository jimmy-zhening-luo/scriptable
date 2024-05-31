declare type Flat<
  Iterable,
> = [Iterable] extends [Array<infer Inner>]
  ? Inner
  : [Iterable] extends [readonly (infer Inner)[]]
      ? Inner
      : never;
