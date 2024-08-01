declare type Positive<
  N extends number = numberful,
  Zero = true,
> = pole<"+", N, Zero>;
