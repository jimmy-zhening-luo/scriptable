declare const pole: unique symbol,
min: unique symbol;
declare type pole<
  P extends
  | "-"
  | "+"
  ,
  N extends number,
  Zero,
> =
  & N
  & {
    [pole]: P;
    [min]: Zero extends false
      ? P extends "+" ? 1 : -1
      : 0;
  }
;
