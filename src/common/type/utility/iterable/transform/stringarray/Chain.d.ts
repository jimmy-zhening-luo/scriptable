declare type Chain<
  A extends readonly string[],
  D extends string = "/",
  Reverse extends boolean = false,
> = literal<D> extends never
  ? never
  : D extends D
    ? ArrayType<A> extends never
      ? never
      : ArrayType<A> extends readonly [infer H extends string, ...infer T extends string[]]
        ? ArrayType<T> extends readonly []
          ? literalful<H>
          : True<Reverse> extends never
            ? `${literalful<H>}${literal<D>}${Chain<ArrayType<T>, literal<D>>}`
            : `${Chain<ArrayType<T>, literal<D>, True<Reverse>>}${literal<D>}${literalful<H>}`
        : never
    : never;

declare namespace Chain {
  export type T = Chain<["a", "b", "c"]>;
  export type T0 = Chain<["a", "b", "c"], "">;
  export type T0a = Chain<["a", "b", "c"], "-">;
  export type T1 = Chain<["a", "b", "c"], "/", true>;
  export type T1a = Chain<["a", "b", "c"], ".", true>;
  export type T2 = Chain<["a", "b" | "bar", "c"]>;
  export type T2a = Chain<["a" | "foo", "b" | "bar", "c"]>; // 4
  export type T3 = Chain<["a", "b", "c"], "." | "/">;
  export type T4 = Chain<["a" | "foo", "b" | "bar", "c"], "." | "/">; // 8
  export type T5 = Chain<["a" | "foo", "b" | "bar", "c"], "." | "/", true>; // 8
}
