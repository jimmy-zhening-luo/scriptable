declare type Primitive<P extends T, T extends primitive> = [T] extends [primitive]
  ? [P] extends [T]
      ? Extract<P, object> extends never
        ? Exclude<P, T> extends never
          ? T extends P
            ? never
            : P
          : never
        : never
      : never
  : never;
