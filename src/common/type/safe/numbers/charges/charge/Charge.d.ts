declare const pole: unique symbol;
declare const nonzero: unique symbol;
declare type Charge<
  N extends number,
  Pole extends
  | "-"
  | "+"
  ,
  NonZero extends boolean = false,
> =
  & N
  & { [pole]: Pole }
  & (
    NonZero extends true
      ? { [nonzero]: true }
      : {}
  )
;
