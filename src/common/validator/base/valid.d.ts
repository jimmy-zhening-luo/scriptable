declare const valid: unique symbol;
declare type Valid<T, Checks> =
  & T
  & (
  Chain<Checks> extends never
    ? never
    : { [valid]: Chain<Checks> }
 )
;
