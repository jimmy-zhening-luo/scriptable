declare type Optionalize<
  Record extends object,
  Optional extends keyof Record,
> = Omit<
  Record,
  Optional
>
& Partial<
  Pick<
    Record,
    Optional
  >
>;
