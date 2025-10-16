declare const polar: unique symbol;
declare type polar<P extends 0 | "-" | "+" = "+"> = number & {
  [polar]: P;
};
