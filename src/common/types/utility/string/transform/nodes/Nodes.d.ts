declare type Nodes<
  Stringlike,
  MinLength = 0,
> = ArrayN<
  Stringify<
    Stringlike
  >
  ,
  MinLength
>;
