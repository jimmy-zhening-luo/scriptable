declare type True<Boolean extends boolean> = Exclude<Boolean, true> extends never
  ? boolean extends Boolean
    ? never
    : Boolean extends true
      ? Boolean
      : never
  : never;
