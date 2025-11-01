declare type Property<
  Value,
  Key extends RecordKey,
  OptionalKey extends RecordKey,
> = [Key] extends [never]
  ? PartialRecord<OptionalKey, Value>
  : [OptionalKey] extends [never]
      ? Record<Key, Value>
      : & Record<Key, Value>
        & PartialRecord<OptionalKey, Value>;
