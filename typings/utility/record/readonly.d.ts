declare type ReadonlyRecord<
  K extends Key,
  V,
> = Readonly<
  Record<
    K,
    V
  >
>;
