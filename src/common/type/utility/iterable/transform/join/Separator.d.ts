declare type Separator<S> = [S] extends [never]
  ? never
  : [string] extends [S]
      ? string
      : [""] extends [S]
          ? string
          : literalful<S>;
