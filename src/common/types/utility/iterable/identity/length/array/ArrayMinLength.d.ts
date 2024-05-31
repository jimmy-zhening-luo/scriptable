declare type ArrayMinLength<
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
    ? ArrayMinLength<
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
      ? ArrayMinLength<
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
