declare const safe: unique symbol;
declare type Safe<
  Type,
  Condition,
> =
  & Type
  & { [safe]: Condition }
;
