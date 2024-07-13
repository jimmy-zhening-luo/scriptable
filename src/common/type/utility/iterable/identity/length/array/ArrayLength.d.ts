declare type ArrayLength<
  A,
  Head extends unknown[] = [],
> = IsIterable<A> extends false
  ? never
  : A extends readonly [infer H, ...infer T]
    ? ArrayLength<T, [...Head, H]>
    : Head["length"];
