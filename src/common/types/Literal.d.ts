declare type literal<S extends string> = string extends S
  ? never
  : S;
