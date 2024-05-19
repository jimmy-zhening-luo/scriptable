declare const acceptor: unique symbol;

type Accepted<A> = { [acceptor]: A };

declare type Accept<
  P extends primitive,
  A,
> =
  & P
  & Accepted<A>
;
