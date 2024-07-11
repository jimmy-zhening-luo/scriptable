declare type ArrayN<
  In,
  L,
  Head extends In[] = [],
> = [In] extends [never]
  ? never
  : L extends number
    ? number extends L
      ? In[]
      : 0 extends L
        ? In[]
        : Head["length"] extends L
          ? [...Head, ...In[]]
          : ArrayN<In, L, [...Head, In]>
    : never;
