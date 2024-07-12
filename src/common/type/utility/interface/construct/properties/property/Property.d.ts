declare type Property<
  K,
  OK,
  V,
> = literalful<K> extends never
  ? Particord<OK, V>
  : Recordful<K, V>
  & (
    literalful<OK> extends never
      ? {}
      : Particordful<OK, V>
  );
