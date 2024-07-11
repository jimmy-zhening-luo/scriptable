type Boundary = Record<
  | "min"
  | "max"
  ,
  number
>;

declare type Limit<
  K extends string,
  Optional = false,
> = IProperty<Boundary, K, Optional>;
