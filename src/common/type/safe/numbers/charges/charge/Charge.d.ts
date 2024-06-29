declare const pole: unique symbol;
declare const nonzero: unique symbol;
declare type Charge<
  Number extends number,
  Pole extends
  | "-"
  | "+"
  ,
  NonZero extends boolean = false,
> =
  & Number
  & { [pole]: Pole }
  & (
    NonZero extends true
      ? { [nonzero]: true }
      : {}
  )
;
