declare type IsArray<T> = [T] extends [readonly unknown[]]
  ? T
  : never;
