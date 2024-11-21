declare type Recordful<K extends string, V> = literalful<K> extends never
  ? never
  : Interface<Record<literalful<K>, V>>;
