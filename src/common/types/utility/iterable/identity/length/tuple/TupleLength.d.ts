declare type TupleLength<
  A,
> = IsArray<
  A
> extends false
  ? never
  : [A] extends [
      Record<
        "length"
        ,
        infer N
      >,
    ]
      ? N extends number
        ? number extends N
          ? never
          : N
        : never
      : never;
