declare type Positive<
  N extends number,
  Zero extends boolean = true,
> = Charge<N, "+", Zero>;
