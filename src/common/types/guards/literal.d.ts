declare type literals<
  K,
> = literalful<
  Extract<
    K,
    string
  >
>;

declare type literalful<
  S extends string,
> = literal<S> extends ""
  ? never
  : literal<S>;

declare type literal<
  S extends string,
> = string extends S
  ? never
  : S;
