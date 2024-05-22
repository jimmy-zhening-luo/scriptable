declare type Limit<
  K extends string,
  Optional extends
  | K
  | boolean = false
  ,
> = IProp<
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
