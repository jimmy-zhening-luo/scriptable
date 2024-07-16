declare type Separator<S extends string> = [string] extends [S]
  ? string
  : [""] extends [S]
      ? string
      : literalful<S>;
