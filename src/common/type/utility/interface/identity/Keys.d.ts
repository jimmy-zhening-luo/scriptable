declare type Keys<R> = {} extends R
  ? never
  : R extends Record<infer K, unknown>
    ? literalful<K>
    : never;
