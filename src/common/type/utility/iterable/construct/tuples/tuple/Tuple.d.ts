declare type Tuple<
  In,
  L extends number,
  Head extends In[] = [],
> = [In] extends [never]
  ? never
  : L extends L
    ? number extends L
      ? In[]
      : Head["length"] extends L
        ? Head
        : Tuple<In, L, [...Head, In]>
    : never;
