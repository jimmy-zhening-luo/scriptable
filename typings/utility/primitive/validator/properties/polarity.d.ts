declare const polarity: unique symbol;
declare type polarity<
  P extends "-" | "+" = "+",
  N extends number = numberful,
> = N & { [polarity]: P };
