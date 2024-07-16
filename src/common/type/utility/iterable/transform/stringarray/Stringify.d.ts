declare type Stringify<Class> = Class extends Class
  ? Class extends Record<"string", infer S>
    ? S extends string
      ? S
      : never
    : Class extends Record<"toString", infer Fn>
      ? Fn extends ()=> string
        ? ReturnType<Fn>
        : never
      : never
  : never;
