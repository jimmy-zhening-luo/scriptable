declare type Exact<
  Actual,
  Prototype,
> = Actual extends Prototype
  ? Exclude<keyof Actual, keyof Prototype> extends never
    ? Actual
    : never
  : never;
