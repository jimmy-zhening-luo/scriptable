declare type Property<K extends string, OK extends string, V> = literalful<K> extends never
  ? Partially<OK, V>
  : Recordful<K, V>
    & (
    literalful<OK> extends never
      ? Recordful<K, V>
      : Partially<OK, V>
  );
