declare type PartialRecord<
  K extends Key,
  V,
> = Partial<
  Record<
    K,
    V
  >
>;
