declare type Stringify<O> = O extends O
  ? O extends Record<"string", infer S>
    ? S extends string
      ? S
      : never
    : O extends Record<"toString", infer Fun>
      ? Fun extends ()=> string
        ? ReturnType<Fun>
        : never
      : never
  : never;
