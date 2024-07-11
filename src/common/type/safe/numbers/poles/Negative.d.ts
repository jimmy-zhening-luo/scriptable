declare type Positive<
  N extends number,
  Zero extends boolean = true,
> = Pole<N, "-", Zero>;
