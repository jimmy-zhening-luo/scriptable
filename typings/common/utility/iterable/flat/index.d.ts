declare type Flat<A extends readonly unknown[]> = A extends readonly (infer B)[]
  ? B
  : never;
