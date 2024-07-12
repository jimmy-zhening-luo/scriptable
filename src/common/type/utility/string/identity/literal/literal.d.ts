declare type literalful<S> = literal<S> extends never
  ? never
  : "" extends S
    ? never
    : S;

declare type literal<S> = [S] extends [string]
  ? string extends S
    ? never
    : S
  : never;
