declare type Flat<A> = [A] extends [never]
  ? never
  : [A] extends [readonly (infer I)[]]
      ? I
      : never;
