declare const v: unique symbol;
declare type valid<T, V extends readonly string[]> =
  & T
  & (Chain<V, ":", true> extends never
    ? never
    : { [v]: Chain<V, ":", true> })
;
