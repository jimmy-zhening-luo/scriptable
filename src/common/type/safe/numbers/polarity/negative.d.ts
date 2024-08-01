declare type Negative<
  N extends number = numberful,
  Zero = true,
> = pole<"-", N, Zero>;
