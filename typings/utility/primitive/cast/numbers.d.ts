declare type Numbers<T> = T extends number
  ? T
  : T extends `${infer N extends number}`
    ? N
    : never;
