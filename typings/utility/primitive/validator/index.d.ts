declare const
full: unique symbol,
and: unique symbol;
declare type full<
  Type extends primitive,
  Of,
  And = "",
> =
  & Type
  & { [full]: Of }
  & ("" extends And ? Type : { [and]: And });
