declare type Acceptor<
  P extends primitive,
  A,
> = (primitive: P)=> primitive is P & A;
