declare type Flat<A extends readonly unknown[]> = Extract<A, readonly never[]> extends never
  ? A extends readonly unknown[]
    ? A extends readonly (infer Element)[]
      ? Element
      : never
    : never
  : never;
