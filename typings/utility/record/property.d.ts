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
  ? Optional extends never
    ? never
    : PartialRecord<OptionalKey, Value>
  : Optional extends never
    ? Record<Key, Value>
    : & Record<Key, Value>
      & PartialRecord<OptionalKey, Value>;
