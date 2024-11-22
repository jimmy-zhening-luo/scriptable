declare type Numeric<N extends number> = [N] extends [number]
  ? Extract<N, object> extends never
    ? Exclude<N, number> extends never
      ? number extends N
        ? never
        : N
      : never
    : never
  : never;
