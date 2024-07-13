declare type Stringify<O> = O extends O
  ? O extends Record<"string", infer S>
    ? S extends string
      ? S
      : never
    : O extends Record<"toString", infer Fn>
      ? Fn extends ()=> string
        ? ReturnType<Fn>
        : never
      : never
  : never;
