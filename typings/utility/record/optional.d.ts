declare type Optional<
  Record extends object,
  K extends keyof Record,
> = Omit<Record, K>
  & Partial<
    Pick<
      Record,
      K
    >
  >;
