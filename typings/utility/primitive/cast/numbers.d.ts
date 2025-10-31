declare type Numbers<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;
