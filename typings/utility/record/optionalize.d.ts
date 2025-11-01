declare type Optionalize<
  Record extends object,
  OptionalKey extends keyof Record,
> = Omit<Record, OptionalKey>
  & Partial<
    Pick<Record, OptionalKey>
  >;
