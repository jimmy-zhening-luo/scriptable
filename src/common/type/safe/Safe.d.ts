declare const p: unique symbol;
declare type Safe<
  Primitive extends primitive,
  Condition,
> =
  & Primitive
  & { [p]: Condition }
;
