declare type Numbers<T> = T extends number
  ? T
  : T extends string
    ? T extends `${infer N extends number}`
      ? N
      : never
    : never;
