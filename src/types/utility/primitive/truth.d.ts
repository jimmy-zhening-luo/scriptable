declare type Truth<B extends boolean> = [B] extends [boolean]
  ? Extract<B, object> extends never
    ? Exclude<B, boolean> extends never
      ? boolean extends B
        ? never
        : B extends true
          ? B
          : never
      : never
    : never
  : never;
