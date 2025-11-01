declare type Property<
  Key extends
  | string
  | number
  | symbol,
  OptionalKey extends
  | string
  | number
  | symbol,
  Value,
>
= Key extends never
  ? OptionalKey extends never
    ? never
    : PartialRecord<OptionalKey, Value>
  : OptionalKey extends never
    ? Record<Key, Value>
    : & Record<Key, Value>
      & PartialRecord<OptionalKey, Value>;
