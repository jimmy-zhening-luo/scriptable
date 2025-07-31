declare type ReadonlyRecord<
  Key extends
  | string
  | number
  | symbol,
  Value,
> = Readonly<Record<Key, Value>>;
