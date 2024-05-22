declare type Scalar<
  K extends string,
  Optional extends
  | K
  | boolean = false
  ,
> = IProperty<
  number
  ,
  K
  ,
  Optional
>;
