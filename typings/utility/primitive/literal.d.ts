declare type Literal<S extends string> = Extract<S, object> extends never
  ? string extends S
    ? never
    : S
  : never;
