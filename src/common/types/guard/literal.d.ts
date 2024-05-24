declare type literals<
  K,
> = literalful<
  Extract<
    K
    ,
    string
  >
>;

declare type literalful<
  S,
> = literal<
  S
> extends ""
  ? never
  : literal<
    S
  >;

declare type literal<
  S,
> = S extends string
  ? string extends S
    ? never
    : S
  : never;
