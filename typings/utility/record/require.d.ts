declare type Require<
  Record extends object,
  Requirement extends keyof Record,
> = Omit<Record, Requirement>
  & Required<
    Pick<Record, Requirement>
  >;
