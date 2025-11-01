declare type PartialRecord<
  Key extends RecordKey,
  Value,
> = Partial<
  Record<Key, Value>
>;
