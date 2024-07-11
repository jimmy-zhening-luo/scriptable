declare const valid: unique symbol;
declare type Valid<
  Type,
  Stamps extends string[],
> = Type & { [valid]: StringChain<Stamps> };
