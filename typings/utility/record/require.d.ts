declare type Require<
  Record extends object,
  K extends keyof Record,
> = Omit<Record, K>
  & Required<
    Pick<Record, K>
  >;
