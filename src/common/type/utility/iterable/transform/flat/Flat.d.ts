declare type Flat<A> = [A] extends [readonly (infer In)[]] ? In : never;
