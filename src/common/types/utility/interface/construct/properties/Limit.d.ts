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

type Boundary = Record<
  | "min"
  | "max"
  ,
  number
>;
