declare type Exclusion<
  String extends string,
  Excluded extends string,
> = Literal<String> extends never
  ? never
  : Literal<Excluded> extends never
    ? never
    : Literal<String> extends `${string}${Literal<Excluded>}${string}`
      ? never
      : Literal<String>;
