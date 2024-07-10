declare type Positive<
  N extends number,
  NonZero extends boolean = false,
> = Charge<N, "-", NonZero>;
