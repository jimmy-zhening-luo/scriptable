declare type ReadonlyRecord<
  Key extends RecordKey,
  Value,
> = Readonly<
  Record<Key, Value>
>;
