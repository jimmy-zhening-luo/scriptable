declare type Positive<
  Number extends number,
  NonZero extends boolean = false,
> = Charge<
  Number,
  "+",
  NonZero
>;
