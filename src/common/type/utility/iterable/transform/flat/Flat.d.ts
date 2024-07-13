declare type Flat<A> = [A] extends [readonly (infer I)[]] ? I : never;
