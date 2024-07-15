declare type Negative<
  N extends number,
  Zero = true,
> = Pole<N, "-", Zero>;
