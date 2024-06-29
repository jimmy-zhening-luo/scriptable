declare const finite: unique symbol;
declare type Finite<
  Number extends number,
> =
  & Number
  & { [finite]: true }
;
