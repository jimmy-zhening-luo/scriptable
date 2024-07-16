declare type Chain<
  A,
  Sp = "/",
  Rev = false,
> = literalful<Sp> extends never
  ? never
  : Sp extends Sp
    ? A extends readonly [infer H, ...infer T]
      ? T extends readonly []
        ? literalful<H>
        : Rev extends false
          ? `${literalful<H>}${Sp}${Chain<T, Sp>}`
          : `${Chain<T, Sp, true>}${Sp}${literalful<H>}`
      : literalful<A>
    : never;
