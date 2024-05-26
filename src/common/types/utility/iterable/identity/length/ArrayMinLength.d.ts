declare type ArrayMinLength<
  A,
  Head extends unknown[] = [],
> = IsArray<
  A
> extends false
  ? never
  : A extends [
    infer I,
    ...infer Rest,
  ]
    ? ArrayMinLength<
      Rest
      ,
      [
        ...Head,
        I,
      ]
    >
    : A extends readonly [
      infer I,
      ...infer Rest,
    ]
      ? ArrayMinLength<
        Rest
        ,
        [
          ...Head,
          I,
        ]
      >
      : Head[
        "length"
      ];
