declare type Optional<
  Record extends object,
  Option extends keyof Record,
> = Omit<Record, Option>
  & Partial<
    Pick<Record, Option>
  >;
