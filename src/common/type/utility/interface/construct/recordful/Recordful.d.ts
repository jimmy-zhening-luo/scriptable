declare type Recordful<K extends string, V> = literalful<K> extends never
  ? never
  : Record<K, V>;
