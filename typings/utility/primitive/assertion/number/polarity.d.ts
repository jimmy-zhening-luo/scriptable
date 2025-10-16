declare const polar: unique symbol;
declare type polar<Polarity extends 0 | "-" | "+" = 0 | "+"> = number & {
  [polar]: Polarity;
};
