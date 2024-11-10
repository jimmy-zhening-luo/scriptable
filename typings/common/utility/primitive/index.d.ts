declare type Primitive<
  P extends Type,
  Type extends primitive,
> = [Type] extends [primitive]
  ? [P] extends [Type]
      ? Extract<P, object> extends never
        ? Exclude<P, Type> extends never
          ? Type extends P
            ? never
            : P
          : never
        : never
      : never
  : never;
