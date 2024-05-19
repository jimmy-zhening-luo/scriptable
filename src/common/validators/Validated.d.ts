declare const validator: unique symbol;

type ValidatedBy<V extends string> = { [validator]: literalful<V> };

declare type Validated<
  T,
  V extends string,
> =
  & T
  & ValidatedBy<V>;
