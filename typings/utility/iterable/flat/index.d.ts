declare type Flat<
  Array extends readonly unknown[],
> = Array extends readonly (infer T)[]
  ? T
  : never;
