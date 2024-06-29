declare const integer: unique symbol;
declare type Integer<
  Number extends number,
> =
  & Number
  & { [integer]: true }
;
