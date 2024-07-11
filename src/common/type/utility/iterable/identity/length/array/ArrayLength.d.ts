declare type ArrayLength<
  Arr,
  Head extends unknown[] = [],
> = IsIterable<Arr> extends false
  ? never
  : Arr extends readonly [infer In, ...infer Rest]
    ? ArrayLength<Rest, [...Head, In]>
    : Head["length"];
