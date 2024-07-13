declare type Tuple<
  I,
  L extends number,
  Head extends I[] = [],
> = [I] extends [never]
  ? never
  : L extends L
    ? number extends L
      ? I[]
      : Head["length"] extends L
        ? Head
        : Tuple<I, L, [...Head, I]>
    : never;
