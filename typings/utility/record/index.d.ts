declare type Recordful<K extends string | number | symbol, V = unknown> = [K] extends [never]
  ? never
  : Exclude<K, Literal<Extract<K, string>> | Numeric<Extract<K, number>> | symbol> extends never
    ? Record<K, V>
    : never;
