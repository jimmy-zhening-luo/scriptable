declare type Flat<
  A,
> = [A] extends [Array<infer I>]
  ? I
  : [A] extends [readonly (infer I)[]]
      ? I
      : never;
