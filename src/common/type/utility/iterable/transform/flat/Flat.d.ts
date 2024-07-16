declare type Flat<A> = ArrayType<A> extends never
  ? never
  : [A] extends [readonly (infer I)[]]
      ? I
      : never;
