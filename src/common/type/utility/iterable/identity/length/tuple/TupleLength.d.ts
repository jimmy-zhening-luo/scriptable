declare type TupleLength<Tuple> = [Arrayed<Tuple>] extends [never]
  ? never
  : [Tuple] extends [Record<"length", infer N>]
      ? [N] extends [number]
          ? [number] extends [N]
              ? never
              : N
          : never
      : never;
