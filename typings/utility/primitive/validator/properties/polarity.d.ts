declare const polarity: unique symbol;
declare type polarity<
  P extends "-" | "+" = "+",
  NumberType extends number = numberful,
> = NumberType & { [polarity]: P };
