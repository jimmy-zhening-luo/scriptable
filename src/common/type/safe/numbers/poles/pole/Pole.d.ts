declare const pole: unique symbol;
declare const min: unique symbol;
declare type Pole<
  N extends number,
  P extends
  | "-"
  | "+"
  ,
  Zero extends boolean,
> = N & { [pole]: P } & { [min]: Zero extends true ? 0 : P extends "+" ? 1 : -1 }
;
