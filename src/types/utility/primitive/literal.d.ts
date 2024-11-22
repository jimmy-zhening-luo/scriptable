declare type literal<S extends string> = [S] extends [string]
  ? Extract<S, object> extends never
    ? Exclude<S, string> extends never
      ? string extends S
        ? never
        : S
      : never
    : never
  : never;
