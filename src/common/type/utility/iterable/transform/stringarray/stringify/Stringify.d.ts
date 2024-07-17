declare type Stringify<C> = C extends Record<"string", infer S extends string>
  ? [S] extends [string]
      ? S
      : never
  : C extends Record<"toString", infer Fn>
    ? [Fn] extends [()=> string]
        ? ReturnType<Fn>
        : never
    : never;
