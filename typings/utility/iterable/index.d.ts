declare type IsArray<A> = [A] extends [readonly unknown[]]
  ? A
  : never;
