declare type Recordful<K, V> = {} extends Record<literalful<K>, V>
  ? never
  : Record<literalful<K>, V>;
