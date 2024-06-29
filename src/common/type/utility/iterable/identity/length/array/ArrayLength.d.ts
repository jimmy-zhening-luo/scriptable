declare type ArrayLength<
  Arr,
  Head extends unknown[] = [],
> = IsIterable<
  Arr
> extends false
  ? never
  : Arr extends [
    infer Inner,
    ...infer Rest,
  ]
    ? ArrayLength<
      Rest
      ,
      [
        ...Head,
        Inner,
      ]
    >
    : Arr extends readonly [
      infer Inner,
      ...infer Rest,
    ]
      ? ArrayLength<
        Rest
        ,
        [
          ...Head,
          Inner,
        ]
      >
      : Head[
        "length"
      ];
