declare type Flat<Array extends readonly unknown[]> = Array extends readonly (infer Member)[]
  ? Member
  : never;
