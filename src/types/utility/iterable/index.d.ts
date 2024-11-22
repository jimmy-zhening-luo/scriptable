declare type Arrayed<A> = [A] extends [readonly unknown[]]
  ? A
  : never;
