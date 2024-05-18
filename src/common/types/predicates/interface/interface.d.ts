type Optional<Record, K extends keyof Record> = Omit<
  Record,
  K
> & Pick<
  Partial<
    Record
  >,
  K
>;

declare type Exact<
  Actual,
  Prototype,
> = Actual extends Prototype
  ? Exclude<keyof Actual, keyof Prototype> extends never
    ? Actual
    : never
  : never;
