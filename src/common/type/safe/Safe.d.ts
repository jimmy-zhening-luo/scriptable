declare const p: unique symbol;
declare type Safe<
  P extends primitive,
  Condition,
> =
  & P
  & { [p]: Condition }
;
