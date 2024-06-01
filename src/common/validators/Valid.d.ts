declare const valid: unique symbol;
declare type Valid<
  Type,
  Prior extends string,
  Validator extends string,
> = literalful<
  Prior
> extends never
  ? never
  : literalful<
    Validator
  > extends never
    ? never
    :
      & Type
      & { [valid]: `${Prior}:${Validator}` }
;
