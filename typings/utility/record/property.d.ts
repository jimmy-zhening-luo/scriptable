declare type Property<K extends string, OK extends string, V> = Literalful<K> extends never
  ? PartialRecordful<OK, V>
  : Recordful<K, V>
    & (
    Literalful<OK> extends never
      ? Recordful<K, V>
      : PartialRecordful<OK, V>
  );
