declare type Numeric<N extends number> = Extract<N, object> extends never
  ? number extends N
    ? never
    : N
  : never;
