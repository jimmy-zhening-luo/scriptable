declare type Chain<
  A,
  Separator extends string = "/",
  Reverse extends boolean = false,
> = literalful<A> extends never
  ? A extends readonly [infer H, ...infer T]
    ? literalful<H> extends never
      ? never
      : T extends readonly []
        ? H
        : Reverse extends true
          ? `${Chain<T, Separator, true>}${Separator}${H}`
          : `${H}${Separator}${Chain<T, Separator>}`
    : never
  : A;
