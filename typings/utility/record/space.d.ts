type Space<
  KeyValue extends
  | string
  | number
  | symbol,
> = Record<KeyValue, KeyValue>;
