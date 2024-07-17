declare type Stringify<C> = C extends Record<"string", infer S extends string>
  ? S
  : C extends Record<"toString", infer Fn extends ()=> string>
    ? ReturnType<Fn>
    : never;

type GG = Stringify<Filepath<1>>;
