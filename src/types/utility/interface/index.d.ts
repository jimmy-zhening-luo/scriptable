declare type Recordful<K extends string, V> = [V] extends [never]
  ? never
  : literalful<K> extends never
    ? never
    : Record<literalful<K>, V>;
