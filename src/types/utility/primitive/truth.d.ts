declare type Truth<B extends boolean> = Extract<B, object> extends never
  ? boolean extends B
    ? never
    : B extends true
      ? B
      : never
  : never;
