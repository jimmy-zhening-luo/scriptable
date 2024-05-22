declare type Scalar<
  K extends string,
  Optional extends
  | K
  | boolean = false
  ,
> = IProp<
  number
  ,
  K
  ,
  Optional
>;
