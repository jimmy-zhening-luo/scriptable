declare type Positive<
  N extends number,
  Zero = true,
> = Pole<N, "+", Zero>;
