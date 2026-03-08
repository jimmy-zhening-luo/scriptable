declare type ReadonlyRecord<
  K extends PropertyKey,
  V,
> = Readonly<
  Record<
    K,
    V
  >
>;
