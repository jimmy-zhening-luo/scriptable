declare type ArrayN<
  I,
  L,
  Head extends I[] = [],
> = [I] extends [never]
  ? never
  : L extends number
    ? number extends L
      ? I[]
      : 0 extends L
        ? I[]
        : Head["length"] extends L
          ? [...Head, ...I[]]
          : ArrayN<I, L, [...Head, I]>
    : never;
