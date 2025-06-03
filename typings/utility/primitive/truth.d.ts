declare type Truth<B extends boolean> = Exclude<B, true> extends never
  ? boolean extends B
    ? never
    : B extends true
      ? B
      : never
  : never;
