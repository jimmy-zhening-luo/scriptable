declare type Flat<A> = Arrayed<A> extends never
  ? never
  : [A] extends [readonly (infer I)[]]
      ? I
      : never;
