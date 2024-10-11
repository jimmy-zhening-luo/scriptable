declare type Table<V = unknown> = [V] extends [never]
  ? never
  : Record<string, V>;
