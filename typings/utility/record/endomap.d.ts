type Endomap<
  KeyValue extends
  | string
  | number
  | symbol,
> = Record<KeyValue, KeyValue>;
