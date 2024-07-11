declare type IProperty<
  V,
  K extends string,
  Optional,
> = string extends K
  ? never
  : Optional extends K | boolean
    ? Unrequire<Record<K, V>, Optional>
    : never;
