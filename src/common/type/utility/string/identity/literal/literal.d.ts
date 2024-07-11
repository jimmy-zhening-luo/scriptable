declare type literals<S> = literalful<Extract<S, string>>;

declare type literalful<S> = [S] extends [string]
  ? string extends S
    ? never
    : "" extends S
      ? never
      : S
  : never;

declare type literal<S> = [S] extends [string]
  ? string extends S
    ? never
    : S
  : never;
