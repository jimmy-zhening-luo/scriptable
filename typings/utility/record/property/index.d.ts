declare type Property<
  Value,
  Key extends RecordKey,
  Option extends RecordKey,
> = [Key] extends [never]
  ? PartialRecord<Option, Value>
  : [Option] extends [never]
      ? Record<Key, Value>
      : & Record<Key, Value>
        & PartialRecord<Option, Value>;
