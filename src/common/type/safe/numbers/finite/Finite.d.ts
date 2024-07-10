declare const finite: unique symbol;
declare type Finite<N extends number> =
  & N
  & { [finite]: true }
;
