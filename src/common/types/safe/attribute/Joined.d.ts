declare const joined: unique symbol;
type Joint<A> = { [joined]: A };

declare type Joined<
  Out extends stringful
  ,
  In,

> = Join<In> extends stringful
  ?
  & Out
  & Joint<
    In
  >
  :
    & string
    & Joint<
      In
    >
;
