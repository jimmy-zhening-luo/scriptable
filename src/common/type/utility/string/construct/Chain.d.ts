declare type Chain<
  A,
  Sep = "/",
  Rev = false,
> = literalful<Sep> extends never
  ? never
  : Sep extends Sep
    ? A extends readonly [infer H, ...infer T]
      ? T extends readonly []
        ? literalful<H>
        : Rev extends false
          ? `${literalful<H>}${Sep}${Chain<T, Sep>}`
          : `${Chain<T, Sep, true>}${Sep}${literalful<H>}`
      : literalful<A>
    : never;
