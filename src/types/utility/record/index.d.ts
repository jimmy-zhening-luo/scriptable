declare type Interface<R> = [R] extends [object]
  ? [Extract<R, readonly unknown[]>] extends [never]
      ? Required<R> extends Record<infer K, unknown>
        ? Exclude<K, string> extends never
          ? literalful<K & string> extends never
            ? never
            : R
          : never
        : never
      : never
  : never;
