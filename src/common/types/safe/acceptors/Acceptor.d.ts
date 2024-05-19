declare type Acceptor<
  P extends primitive,
  A extends P,
> = (primitive: P)=> primitive is P & A;
