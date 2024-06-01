declare const valid: unique symbol;
declare type Valid<
  Type,
  Validator extends string,
  Prior extends string,
> = literalful<
  Validator
> extends never
  ? never
  : literalful<
    Prior
  > extends never
    ? never
    :
      & Type
      & { [valid]: `${Validator}:${Prior}` }
;
