declare const valid: unique symbol;
declare type Valid<
  Type,
  Validator extends string,
> =
  & Type
  & { [valid]: literalful<Validator> }
;
