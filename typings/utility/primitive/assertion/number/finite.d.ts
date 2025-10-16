declare const finite: unique symbol;
declare type finite<N extends number = number> = N
  & numberful
  & { [finite]: true };
