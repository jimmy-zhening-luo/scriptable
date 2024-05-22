declare type Flag<
  K extends string,
  Optional extends
  | K
  | boolean = true
  ,
> = IProperty<
  boolean
  ,
  K
  ,
  Optional
>;
