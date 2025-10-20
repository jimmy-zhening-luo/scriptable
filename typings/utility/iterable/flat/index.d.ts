declare type Flat<A extends readonly unknown[]> = A extends readonly (infer Element)[]
  ? Element
  : never;
