declare type Property<K extends string, OK extends string, V> = literalful<K> extends never
  ? Particord<OK, V>
  : Recordful<K, V>
  & (
    literalful<OK> extends never
      ? {}
      : Particord<OK, V>
  );
