declare const acceptor: unique symbol;

type Checked<A extends string> = { [acceptor]: literalful<A> };

declare type Safe<
  T,
  A extends string,
> =
  & T
  & Checked<A>
;
