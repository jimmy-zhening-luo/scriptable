declare type Numbers<T> = T extends number
  ? T
  : T extends `${infer Number extends number}`
    ? Number
    : never;
