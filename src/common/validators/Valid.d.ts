declare const valid: unique symbol;
declare type Valid<
  Type,
  Validator extends string[],
> =
  & Type
  & { [valid]: StringChain<Validator> }
;

declare type ValidTest = Valid<
  string
  ,
  [
    "stringful",
    "length",
    "god",
  ]
>;
