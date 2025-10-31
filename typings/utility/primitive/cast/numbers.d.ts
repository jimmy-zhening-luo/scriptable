declare type Numbers<T> = T extends `${infer N extends number}`
    ? N
    : never
  : never;
