declare type Limit<
  K extends string,
  Optional extends
  | K
  | boolean = false
  ,
> = IProperty<
  Boundary
  ,
  K
  ,
  Optional
>;

type Boundary = Record<
  | "min"
  | "max"
  ,
  number
>;
