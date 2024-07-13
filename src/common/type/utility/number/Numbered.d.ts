declare type Numbered<N> = [N] extends [number]
  ? [number] extends [N]
      ? never
      : N
  : never;
