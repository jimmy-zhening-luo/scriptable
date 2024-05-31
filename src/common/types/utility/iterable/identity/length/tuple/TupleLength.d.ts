declare type TupleLength<
  Tuple,
> = IsIterable<
  Tuple
> extends false
  ? never
  : [Tuple] extends [
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
