declare const polar: unique symbol;
declare type polar<P extends 0 | "-" | "+" = "+"> = numberful & {
  [polar]: P;
};
