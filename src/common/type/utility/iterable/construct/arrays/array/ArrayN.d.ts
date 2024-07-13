// TODO: Hide accumulator
declare type ArrayN<
  I,
  L,
  H extends I[] = [],
> = [I] extends [never]
  ? never
  : L extends number
    ? number extends L
      ? I[]
      : 0 extends L
        ? I[]
        : H["length"] extends L
          ? [...H, ...I[]]
          : ArrayN<I, L, [...H, I]>
    : never;
