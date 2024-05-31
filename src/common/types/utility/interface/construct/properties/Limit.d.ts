type Boundary = Record<
  | "min"
  | "max"
  ,
  number
>;

declare type Limit<
  Key extends string,
  OptionalKey = false,
> = IProperty<
  Boundary
  ,
  Key
  ,
  OptionalKey
>;
