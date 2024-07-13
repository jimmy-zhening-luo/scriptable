declare const pole: unique symbol;
declare const min: unique symbol;
declare type Pole<
  N extends number,
  P extends
  | "-"
  | "+"
  ,
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
