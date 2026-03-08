declare type PartialRecord<
  K extends PropertyKey,
  V,
> = Partial<
  Record<
    K,
    V
  >
>;
