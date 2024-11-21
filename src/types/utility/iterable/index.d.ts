declare type It<A> = [A] extends [readonly unknown[]]
  ? A
  : never;
