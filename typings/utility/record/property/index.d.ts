declare type Property<
  V,
  K extends Key,
  Option extends Key,
> = [K] extends [never]
  ? PartialRecord<Option, V>
  : [Option] extends [never]
      ? Record<K, V>
      : & Record<K, V>
        & PartialRecord<Option, V>;
